import os
import sys
import zipfile
import tarfile
from os import path, remove, rmdir
from urllib import request

# constants
""" About file and dirs

"""
file_name = "/build.tar.gz"
download_path = "/tmp" + file_name
install_dir = "/usr/local/bin"


""" About URLs
e.g,
    lastest: https://github.com/itsmekingtiger/carpediem-web/releases/latest/download/build.tar.gz
    tagged: https://github.com/itsmekingtiger/carpediem-web/releases/download/0.0.1/build.tar.gz
"""
base_url = "https://github.com/itsmekingtiger/carpediem-web/releases"


class color:
    HEADER = "\033[95m"
    INFO = "\033[94m"
    CYAN = "\033[96m"
    OK = "\033[92m"
    WARN = "\033[93m"
    FAIL = "\033[91m"
    ENDC = "\033[0m"
    BOLD = "\033[1m"
    UNDERLINE = "\033[4m"


def get_tag():
    return None if len(sys.argv) <= 1 else sys.argv[1]


def assamble_download_url(tag: str = None):
    if tag:
        return base_url + f"/download/{tag}" + file_name
    else:
        return base_url + "/latest/download" + file_name


def print_commit_id(target: str):
    if path.exists(target + "/build/gitlog.txt"):
        with open(target + "/build/gitlog.txt", "r") as f:
            print(f"✔ commit id: {f.readline()}")
    else:
        print(color.WARN + f"! file not found")


###############################################################################

if __name__ == "__main__":
    # assamble download url

    tag = get_tag()
    if tag:
        print(f"- tag: {tag}")

    download_url = assamble_download_url(tag)
    print(f"- download url resolved: {download_url}")

    try:
        # downlaod file
        _, header = request.urlretrieve(download_url, download_path)
        print(f"✔ download complete, saved at: {download_path}")

        # unzip
        with tarfile.open(download_path) as f:
            f.extractall(install_dir)
            print(f"✔ file extracted at: {install_dir}")

        print_commit_id(install_dir)

        print(color.OK + f"🎉 done")
        print(color.ENDC)

    except Exception as e:
        print(color.FAIL + f"! failed to update website: {e}")
        print(color.ENDC + e.with_traceback())
