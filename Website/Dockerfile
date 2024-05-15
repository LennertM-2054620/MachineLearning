FROM python:3

WORKDIR /app

RUN pip install Flask tensorflow opencv-python

COPY . .

CMD [ "flask", "--app",  "main", "--debug", "run", "--host=0.0.0.0"]