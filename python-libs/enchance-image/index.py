import sys
import os

repo_path = os.path.abspath(os.path.join(os.path.dirname(__file__), 'stable-dreamfusion'))
sys.path.append(repo_path)

from index import recreate



def generate_3d_model(image_paths, output_path):
    try:
        model = generate_model(image_paths)
        model.save(output_path)
        print(f"Model saved at {output_path}")
    except Exception as e:
        print(f"Error during model generation: {e}")
        sys.exit(1)


if __name__ == "__main__":
    image_paths = sys.argv[1].split(',')
    output_path = sys.argv[2]
    generate_3d_model(image_paths, output_path)