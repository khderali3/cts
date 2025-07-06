from setuptools import setup, Extension
from Cython.Build import cythonize
import sys
import os
import shutil

file = "signals.py"

if not os.path.exists(file):
    print(f"{file} not found.")
    sys.exit(1)

# Get absolute path and base filename
file_path = os.path.abspath(file)
base_name = os.path.splitext(os.path.basename(file))[0]
c_file = os.path.splitext(file_path)[0] + ".c"

try:
    setup(
        ext_modules=cythonize(
            Extension(
                name=base_name,
                sources=[file_path],
            ),
            compiler_directives={"language_level": "3"},
        ),
        script_args=["build_ext", "--inplace"]
    )
finally:
    # Clean build dir
    build_dir = "build"
    if os.path.isdir(build_dir):
        try:
            shutil.rmtree(build_dir)
            print(f"Deleted build directory: {build_dir}")
        except Exception as e:
            print(f"Failed to delete build directory: {e}")

    # Clean generated C file
    if os.path.isfile(c_file):
        try:
            os.remove(c_file)
            print(f"Deleted generated C file: {c_file}")
        except Exception as e:
            print(f"Failed to delete C file: {e}")
