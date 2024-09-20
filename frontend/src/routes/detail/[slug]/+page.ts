// Copyright 2024 Tobias Olenyi.
// SPDX-License-Identifier: Apache-2.0

export function load({ params }) {
    console.log(params.slug);
    return {
        slug: params.slug
    }
}
