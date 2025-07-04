from setuptools import setup, Extension
from Cython.Build import cythonize

ext_modules = [
    Extension("urls", ["urls.py"]),
]

setup(
    ext_modules=cythonize(ext_modules, compiler_directives={'language_level': "3"}),
    script_args=["build_ext", "--inplace"],
)
