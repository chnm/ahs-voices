#!/usr/bin/env bash
#
# Build PDF versions of the admin guides with pandoc.
# Produces one PDF per guide plus a combined manual, all in docs/pdf/.
#
# Requirements: pandoc and a LaTeX engine (xelatex, from MacTeX/TeX Live).
# Usage: ./docs/build-pdfs.sh   (run after editing any guide)
#
set -euo pipefail
cd "$(dirname "$0")"   # docs/

command -v pandoc   >/dev/null || { echo "pandoc not found (brew install pandoc)"; exit 1; }
command -v xelatex  >/dev/null || { echo "xelatex not found (install MacTeX / TeX Live)"; exit 1; }

mkdir -p pdf

# Guides in reading order. Add new guides to this list as they're written.
GUIDES=(
  adding-oral-histories.md
  managing-collections.md
)

# Shared pandoc options. --resource-path=. lets images/... paths resolve.
COMMON=(--pdf-engine=xelatex -f gfm -V geometry:margin=1in -V linkcolor:blue --resource-path=.)

# One PDF per guide.
for md in "${GUIDES[@]}"; do
  out="pdf/${md%.md}.pdf"
  echo "Building $out"
  pandoc "$md" -o "$out" "${COMMON[@]}"
done

# Combined manual with a title page and table of contents.
echo "Building pdf/arlington-stories-admin-guide.pdf"
pandoc "${GUIDES[@]}" -o pdf/arlington-stories-admin-guide.pdf \
  "${COMMON[@]}" --toc --toc-depth=2 \
  --metadata title="Arlington Stories — Administrator's Guide"

echo "Done. PDFs are in docs/pdf/"
