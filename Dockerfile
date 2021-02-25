FROM python:3.4-alpine as DEV

# Timezone
ENV TZ=America/Bahia
ENV DATABASE_DRIVE=sqlite3

WORKDIR /usr/src/picha

COPY requirements.txt ./

RUN set -x \ 
    apk add postgresql-libs && \
    apk add --virtual .build-deps gcc musl-dev postgresql-dev && \
    pip install --no-cache-dir -r requirements.txt && \
    apk --purge del .build-deps && \
    apk add postgresql-dev && \
    rm -rf /var/cache/apk/*

COPY . .

CMD [ "python", "./manage.py", "runserver", "0.0.0.0:8000" ]