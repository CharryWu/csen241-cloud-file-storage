FROM python:alpine

WORKDIR /app

COPY requirements.txt ./

COPY main.py ./

RUN pip install -r requirements.txt

CMD ["python3", "main.py"]