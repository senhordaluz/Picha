FROM python:3.4-slim as DEV

# Timezone
ENV TZ=America/Bahia

WORKDIR /usr/src/picha

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD [ "python", "./manage.py", "runserver", "0.0.0.0:8000" ]