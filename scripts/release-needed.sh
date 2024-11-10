# Copyright 2024 Tobias Olenyi.
# SPDX-License-Identifier: Apache-2.0

#!/bin/bash

# Make script exit on any error
set -e

echo "🔍 Semantic Release Check"
echo "----------------------------------------"

# Function to run semantic-release command with common parameters
run_semantic_release() {
    local args=$1
    local noop=${2:-}
    local cmd="uv tool run --from python-semantic-release semantic-release -c releaserc.toml"
    if [ -n "$noop" ]; then
        cmd="$cmd --noop"
    fi
    cmd="$cmd $args"
    $cmd 2>/dev/null
}

echo "1️⃣ Getting current tag (would-be release)..."
current_tag=$(run_semantic_release "version --no-vcs-release --print-tag" "true")
echo "   Current tag would be: '$current_tag'"

echo "2️⃣ Getting last released tag..."
last_tag=$(run_semantic_release "version --print-last-released-tag" "true")
echo "   Last released tag was: '$last_tag'"

echo "----------------------------------------"
if [ "$current_tag" = "$last_tag" ]; then
    echo "✅ Result: No release needed - tags match"
    release_needed="false"
    echo "release_needed=false" >> $GITHUB_OUTPUT
    echo "tag=$last_tag" >> $GITHUB_OUTPUT
else
    echo "🚀 Result: Release is needed - tags differ"
    echo "📝 Creating changelog and tag..."
    run_semantic_release "version --commit --push --tag --changelog --no-vcs-release"
    release_needed="true"
    echo "release_needed=true" >> $GITHUB_OUTPUT
    echo "tag=$current_tag" >> $GITHUB_OUTPUT
fi

echo "----------------------------------------"
echo "Debug Information:"
echo "• Release needed: $release_needed"
echo "• Current tag: $current_tag"
echo "• Last tag: $last_tag"
