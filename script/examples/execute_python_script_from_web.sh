curl -sSf https://gist.githubusercontent.com/mosbth/b274bd08aab0ed0f9521/raw/52ed0bf390384f7253a37c88c1caf55886b83902/hello.py | python3

curl -sSf https://pastebin.com/raw/9LfLcGLS | python3


( curl -sSf https://pastebin.com/raw/9LfLcGLS; echo "hello"; echo "world"; ) | python3

python3 <($(curl -sSf https://pastebin.com/raw/9LfLcGLS))

{
    curl -sSf https://pastebin.com/raw/9LfLcGLS
    echo "hello"
    echo "world"
} | python3

wget https://pastebin.com/raw/9LfLcGLS && python3 9LfLcGLS hello world && rm 9LfLcGLS

python3 -c "$(curl -sSf https://pastebin.com/raw/9LfLcGLS)" hello world
