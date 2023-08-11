
# Start from a rust base image
FROM rust:1.70.0 as base

# Set the current directory
WORKDIR /OpenSmartContract

# Prepare Rust
RUN apt update

RUN apt-get install -y binaryen pkg-config git clang curl libssl-dev protobuf-compiler build-essential

# Download and install swanky-cli and verify the installation
RUN curl -L https://github.com/AstarNetwork/swanky-cli/releases/download/v3.0.4/swanky-v3.0.4-be91475-linux-x64.tar.gz | tar xz -C /opt && \
  ln -s /opt/swanky/bin/swanky /usr/local/bin/swanky

# Install Rustup and Rust, additional components, packages, and verify the installations
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y && \
  /bin/bash -c "source /usr/local/cargo/env && \
  rustup toolchain install nightly-2023-01-01 && \
  rustup default nightly-2023-01-01 && \
  rustup component add rust-src --toolchain nightly-2023-01-01 && \
  rustup target add wasm32-unknown-unknown --toolchain nightly-2023-01-01 && \
  # cargo install cargo-dylint dylint-link && \
  cargo install cargo-contract --force --version 2.0.2 && \   
  rustc --version"

# Install Node.js
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - && apt-get install -y nodejs

# Install Yarn 1.x
RUN npm install -g yarn@1

# Verify installations
RUN node --version && \
  swanky --version && \
  yarn --version

# Clean up the package lists to reduce image size
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy everthing that is not dockerignored to the image
COPY . .

# Install npm dependencies
RUN npm install

RUN swanky contract compile foodorder