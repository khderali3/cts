# compile_with_cython.py

from setuptools import setup
from Cython.Build import cythonize
import sys
import os

filename = "urls.py"  # Change this to your file name

if not os.path.exists(filename):
    print(f"{filename} not found.")
    sys.exit(1)

setup(
    ext_modules=cythonize(filename, compiler_directives={"language_level": "3"}),
    script_args=["build_ext", "--inplace"]
)
