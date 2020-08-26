ARG NODE_VERSION
FROM node:${NODE_VERSION}

ARG NEXTJS_VERSION
ENV NEXTJS_VERSION=${NEXTJS_VERSION}

RUN apk update && apk upgrade && apk add build-base gcc autoconf automake zlib-dev libpng-dev nasm bash libc6-compat

COPY docker-entrypoint.sh /usr/local/bin/

RUN mkdir /srv/app
# && chown 1000:1000 -R /srv/app

USER $UNAME

WORKDIR /srv/app
VOLUME /srv/app

EXPOSE 3000

ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["next", "dev"]
