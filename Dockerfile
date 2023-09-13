
# Start from a rust base image
FROM rust

# Set the current directory
WORKDIR /OpenSmartContract

# Prepare Rust
RUN apt-get update && \
    apt-get install libclang-dev -y && \
    apt-get install nodejs -y && \
    apt-get install npm -y && \
    apt-get install binaryen -y && \
    apt-get install pkg-config -y && \
    apt-get install git -y && \
    apt-get install clang -y && \
    apt-get install curl -y && \
    apt-get install libssl-dev -y && \
    apt-get install build-essential -y && \
    apt-get install protobuf-compiler -y

RUN npm install -g n && \
    n stable

RUN curl -sSf https://sh.rustup.rs | sh -s -- -y

RUN rustup component add rust-src
RUN rustup target add wasm32-unknown-unknown

# RUN cargo install cargo-dylint dylint-link

RUN cargo install cargo-contract --version 3.2.0 --force

RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - && apt-get install -y nodejs

RUN npm install -g @astar-network/swanky-cli

# Verify installations
RUN node --version && \
  swanky --version

# Clean up the package lists to reduce image size
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy everthing that is not dockerignored to the image
COPY . .

# Install npm dependencies
RUN npm install

RUN swanky contract compile foodorder -v