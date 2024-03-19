import flask
from flask import Flask, jsonify, request, render_template, redirect, url_for 
from flask_restx import Api, Resource
from flask_cors import CORS
from PIL import Image
import pandas as pd
import numpy as np
import os
from werkzeug.utils import secure_filename 
import gensim
import gensim.downloader 

# Optimized imports for clarity and potential efficiency
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.manifold import TSNE

# Constants
UPLOAD_FOLDER = 'uploads'

app = Flask(__name__, static_folder='static') 
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app)
api = Api(app, doc='/docs')

# Load the word embedding model outside of endpoint functions for efficiency
model = gensim.downloader.load('glove-wiki-gigaword-100')

# --------- Routes -----------

@api.route('/hello')
class HelloResource(Resource):
    """Provides a simple greeting message.""" 
    def get(self):
        return {"message": "Corporatica Software Engineering Task"}


@api.route('/upload_image')
class ImageUpload(Resource):
    """Handles image uploads and histogram calculation."""
    def post(self):
        if 'image' not in request.files:
            return {'error': 'No image file provided'}, 400

        file = request.files['image']
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        try:
            img = Image.open(filepath)
            histogram = np.hstack([
                img.histogram()[:256], 
                img.histogram()[256:512],
                img.histogram()[512:], 
            ])

            return {
                'message': 'Image uploaded and processed',
                'histogram': histogram.tolist()  # Convert to list for JSON
            }, 200

        except Exception as e:
            return {'error': f'Image processing error: {str(e)}'}, 500 # Direct return

# -------- Text Processing Functions ---------

def process_text(text):
    """
    Processes text to generate word vectors using Gensim's Word2Vec.

    Args:
        text (str): The text to be processed.

    Returns:
        tuple: A tuple containing:
            - words (list): A list of words from the text.
            - vectors (list): A list of corresponding word vectors.
    """
    model = gensim.models.Word2Vec([text.split()], vector_size=100, window=5, min_count=1, workers=4)
    word_vectors = model.wv
    words = list(word_vectors.key_to_index.keys())
    vectors = [word_vectors[word] for word in words]
    return words, vectors


def perform_tsne(vectors):
    """
    Performs t-SNE dimensionality reduction on word vectors.

    Args:
        vectors (list): A list of word vectors.

    Returns:
        list: A list of reduced 2D vectors.
    """
    vectors_array = np.array(vectors)
    tsne = TSNE(n_components=2, random_state=42)
    reduced_vectors = tsne.fit_transform(vectors_array)
    return reduced_vectors.tolist()

# -------- Text Analysis Endpoint -----------
@api.route('/analyze-text', methods =['POST'])
class TextAnalyzer(Resource):
    """Handles text analysis, including word embedding generation and t-SNE."""

    def post(self):
        data = request.get_json()
        text = data.get('text', '')
        if not text:
            return {'error': 'Text input is missing'}, 400

        words, vectors = process_text(text)
        reduced_vectors = perform_tsne(vectors)

        return {'words': words, 'reduced_vectors': reduced_vectors}


# -------- CSV Analyzer -------- 
@api.route('/analyze-csv', methods=['POST'])
class CSVAnalyzer(Resource):
    """Handles CSV analysis, providing descriptive statistics."""

    def post(self):
        if 'file' not in request.files:
            return jsonify({'error': 'No CSV file uploaded'}), 400

        file = request.files['file']

        try:
            df = pd.read_csv(file)
            statistics = df.describe().to_dict()  # Efficiently get descriptive statistics

            return jsonify(statistics) 

        except Exception as e:
            return jsonify({'error': f'Error processing CSV: {str(e)}'}), 500

if __name__ == '__main__':

    app.run(debug=True, host='0.0.0.0') 