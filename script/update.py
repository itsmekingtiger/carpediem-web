import sys
import zipfile
from os import path, remove
from typing import Final
from urllib import request

# constants
""" About file and dirs

"""
file_name: Final = "/build.tar.gz"
download_path: Final = path.join("/tmp", file_name)
install_dir: Final = "/urs/local/bin"


""" About URLs
e.g,
    lastest: https://github.com/itsmekingtiger/carpediem-web/releases/latest/download/build.tar.gz
    tagged: https://github.com/itsmekingtiger/carpediem-web/releases/download/0.0.1/build.tar.gz
"""
base_url: Final = "https://github.com/itsmekingtiger/carpediem-web/releases"


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


def assamble_download_url(tag: str = None):
    if tag:
        return base_url + f"/download/{tag}" + file_name
    else:
        return base_url + "/latest/download" + file_name


def delete_file(target: str):
    if path.exists(target):
        remove(target)
        print(color.INFO + "old file removed")
    else:
        print(color.WARN + "old file does not exist")


###############################################################################

if __name__ == "__main__":
    # assamble download url
    download_url = None
    if len(sys.argv) == 1:
        download_url = base_url + "/latest/download" + file_name
    else:
        download_url = base_url + f"/download/{sys.argv[1]}" + file_name

    try:
        # downlaod file
        _, header = request.urlretrieve(download_url, download_path)

        delete_file(path.join(install_dir, "build"))

        # unzip
        with zipfile.ZipFile(download_path, "r") as zip_file:
            zip_file.extractall(install_dir)

    except Exception as e:
        print(color.FAIL + f"failed to update website: {e}")
        exit(-1)

    print(color.OK + f"web site update from: {download_url}")
