# Use a slim Python 3.8.10 image
FROM python:3.8.10-slim

# Create a working directory
WORKDIR /app

#ENV FLASK_APP = server.py

#ENV FLASK_ENV = development

# Copy requirements.txt
COPY ./requirements.txt ./

# Install dependencies
RUN pip install -r requirements.txt

# Copy your project code
COPY . .

# Expose Flask app port (usually 5000)
EXPOSE 5000

# Run the Flask app (assuming app.py is your entry point)
CMD ["python", "server.py"]