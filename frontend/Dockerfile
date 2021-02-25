FROM node:dubnium-alpine

# Timezone
ENV TZ=America/Sao_Paulo

RUN set -x \
    # Install base packages
    && apk update \
    && apk upgrade \
    && apk add ca-certificates curl \
    && update-ca-certificates \
    && apk add --update git \
    # Change TimeZone
    && apk add --update tzdata \
    # Atualiza Yarn
    && curl --compressed -o- -L https://yarnpkg.com/install.sh | sh \
    # Instala pacotes
    && apk add --update \
        git \
        curl \
        openssl \
        openssh \
    # Limpa Cache
    && rm -rf /var/cache/apk/* \
    && apk del tzdata curl

ADD --chown=node:node . /app

RUN chmod -R 0744 /app

USER node
WORKDIR /app

RUN set -x \
    # Instala libs do Node
    && yarn install --link-duplicates --non-interactive --silent \
    && yarn cache clean

# Define script de execução padrão
CMD [ "yarn", "start" ]