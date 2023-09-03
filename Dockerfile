FROM python:3.10.5

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8

RUN apt-get update && apt-get install -y \
    postgresql-client \
    libpq-dev \
    gcc \
    git


RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

RUN pip install --upgrade pip

WORKDIR /opt/code

COPY package*.json ./

RUN npm ci

COPY requirements*.txt ./

RUN pip install -r requirements.txt

COPY . ./
