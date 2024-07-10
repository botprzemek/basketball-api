FROM ubuntu:latest
LABEL authors="botpr"

ENTRYPOINT ["top", "-b"]