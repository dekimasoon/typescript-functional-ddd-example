FROM debian:bookworm

ENV TERM=xterm
ENV ZSH_THEME=pure
ENV LANG=en_US.UTF-8
ENV LC_ALL=en_US.UTF-8

RUN mkdir -p /cache && \
    apt-get update && \
    apt-get install -y vim git curl openssl ca-certificates locales zsh jq && \
    localedef -f UTF-8 -i en_US en_US.UTF-8 && \
    rm -rf /var/lib/apt/lists/*

# zsh
RUN ZSH="$HOME/.oh-my-zsh" sh -c \
    "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended && \
    echo "export HISTFILE=/cache/.zsh_history" >> "/root/.zshrc" && \
    chsh -s $(which zsh)

# git
RUN git config --global credential.helper "store --file /cache/.git-credentials"

# docker
RUN curl -fsSL https://get.docker.com -o get-docker.sh && \
    sh get-docker.sh && \
    rm get-docker.sh

# node.js
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && \
    apt-get install -y nodejs && \
    npm config set cache /cache/nodejs/.npm --global && \
    rm -rf /var/lib/apt/lists/*

# lazygit
RUN ARCH=$(uname -m | sed 's/x86_64/amd64/;s/aarch64/arm64/') && \
    LAZYGIT_VERSION=$(curl -s https://api.github.com/repos/jesseduffield/lazygit/releases/latest | jq -r '.tag_name' | tr -d 'v') && \
    curl -Lo lazygit.tar.gz "https://github.com/jesseduffield/lazygit/releases/latest/download/lazygit_${LAZYGIT_VERSION}_Linux_${ARCH}.tar.gz" && \
    tar xf lazygit.tar.gz -C /usr/local/bin lazygit && \
    rm lazygit.tar.gz
