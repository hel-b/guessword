
FROM node:22-bookworm-slim AS base
# Install dumb-init so container does not get hung-up when killed
# set up nextjs app directory and permissions for non-root user
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init \
    && rm -rf /var/lib/apt/lists/* /var/lib/log/*  /var/lib/cache/* /var/cache/apt/archives/* \
    && apt-get clean \
    && mkdir -p /nextjs \
    && chown node:node /nextjs
# Create app directory
WORKDIR /nextjs
# Set user to non-root
USER node
# Install app dependencies
COPY --chown=node:node ./nextjs/package*.json ./
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# Set db file paths
ENV USERS_DB_PATH=/nextjs/data/users.db
ENV DICTIONARY_DB_PATH=/nextjs/data/dictionary.db


FROM base AS prod-deps
# Specifies run environment and significantly improves performance
ENV NODE_ENV=production
# Install production dependencies
RUN npm ci --omit=dev \ 
    && npm cache clean --force 


FROM base AS build
# Increase memory allocation for build process and set db file path
ENV NODE_OPTIONS=--max_old_space_size=2048
# Bundle app source (all but db folder)
COPY --chown=node:node ./nextjs .
# Install app dependencies
# and remove db files to prevent them causing issues during build
# (they will be re-created at runtime if they do not exist)
RUN npm ci \
    && npm cache clean --force \
    && rm -rf /nextjs/data/users*
# Build nextjs app
RUN npm run build

FROM base AS runtime
# Specifies run environment and significantly improves performance
ENV NODE_ENV=production
# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1
# Copy dependencies and built application
COPY --chown=node:node --from=prod-deps /nextjs/node_modules /nextjs/node_modules
COPY --chown=node:node --from=build  /nextjs/.next ./.next
COPY --chown=node:node --from=build /nextjs/public /nextjs/public
COPY --from=build /nextjs/lib/db/stats-query.sql /nextjs/lib/db/stats-query.sql
# Set runtime environmental variables
ENV HOSTNAME=0.0.0.0 PORT=80
# Expose port
EXPOSE 80
# init server with dumb-init for graceful shutdown
CMD ["dumb-init", "npm", "start"]
