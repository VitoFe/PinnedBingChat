#!/bin/bash

# Get the name of the current directory
dirname=$(basename "$PWD")
# Cleanup previous xpi
rm "$dirname.xpi"

# Generate the icons
resolutions=(128 64 48 32)
mkdir "icons"

for res in "${resolutions[@]}"
do
    inkscape "./svg/base.svg" -C -w $res -h $res -o "./icons/icon-${res}.png"
    inkscape "./svg/base_addon.svg" -C -w $res -h $res -o "./icons/addon-${res}.png"
done


# Create xpi
zip -r "$dirname.xpi" * -x "$0" -x "svg/*"
# Remove generated icons
rm -rf "./icons"
