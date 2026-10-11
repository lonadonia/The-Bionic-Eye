#!/usr/bin/env bash
# Rebuilds every web derivative in public/media from the client asset pack.
# Usage: scripts/qa/encode-media.sh "<asset-pack-dir>" [public/media]
# Needs ffmpeg 6+ with libx264, AV1 (dav1d) and HEVC decoding — set FFMPEG=/path/to/ffmpeg if not on PATH.
set -euo pipefail

SRC="${1:?usage: encode-media.sh <asset-pack-dir> [out-dir]}"
OUT="${2:-public/media}"
FF="${FFMPEG:-ffmpeg}"
X264=(-c:v libx264 -preset slow -profile:v high -pix_fmt yuv420p -movflags +faststart)
mkdir -p "$OUT/video" "$OUT/poster" "$OUT/img"
log() { echo "[$(date +%T)] $*"; }

# ---------- Video ----------
log "01 hero (1080p + 540p)"
"$FF" -v error -y -i "$SRC/C10-Use-Case-Shorts-Final-Horizontal.mp4" -map 0:v:0 -map 0:a:0 -vf "scale=1920:-2:flags=lanczos" "${X264[@]}" -crf 26 -maxrate 3000k -bufsize 6000k -g 50 -c:a aac -b:a 96k -ac 2 "$OUT/video/hero-c10-use-cases-1080.mp4"
"$FF" -v error -y -i "$SRC/C10-Use-Case-Shorts-Final-Horizontal.mp4" -map 0:v:0 -map 0:a:0 -vf "scale=960:-2:flags=lanczos" "${X264[@]}" -crf 27 -maxrate 1100k -bufsize 2200k -g 50 -c:a aac -b:a 80k -ac 2 "$OUT/video/hero-c10-use-cases-540.mp4"
log "02 applications"
"$FF" -v error -y -i "$SRC/C10 Short Low bitrate.mp4" -map 0:v:0 -map 0:a:0 -vf "scale=1280:-2:flags=lanczos" "${X264[@]}" -crf 27 -maxrate 1800k -bufsize 3600k -g 50 -c:a aac -b:a 96k -ac 2 "$OUT/video/applications-c10-short-720.mp4"
"$FF" -v error -y -i "$SRC/5f69a5e2-edb9-4dff-8bd8-14d3a8d570d0.MP4" -map 0:v:0 -vf "scale=720:-2:flags=lanczos,fps=30" "${X264[@]}" -crf 27 -maxrate 1600k -bufsize 3200k -g 60 -an "$OUT/video/applications-uk-cladding-portrait.mp4"
log "03 the system"
"$FF" -v error -y -i "$SRC/C10_Introduction_short.mp4" -map 0:v:0 -map 0:a:0 -vf "scale=1280:-2:flags=lanczos" "${X264[@]}" -crf 27 -maxrate 1600k -bufsize 3200k -g 50 -c:a aac -b:a 96k -ac 2 "$OUT/video/system-c10-introduction-720.mp4"
log "04 support (excerpts)"
"$FF" -v error -y -ss 0 -t 60 -i "$SRC/C10 Academy.mp4" -map 0:v:0 -map 0:a:0 -vf "scale=1280:-2:flags=lanczos" "${X264[@]}" -crf 27 -maxrate 1500k -bufsize 3000k -g 50 -c:a aac -b:a 96k -ac 2 "$OUT/video/support-c10-academy-excerpt.mp4"
"$FF" -v error -y -ss 0 -t 75 -i "$SRC/ABZ Clean Station _ Full Setup & Operation Guide.mp4" -map 0:v:0 -map 0:a:0 -vf "scale=1280:-2:flags=lanczos,fps=24" "${X264[@]}" -crf 27 -maxrate 1500k -bufsize 3000k -g 48 -c:a aac -b:a 96k -ac 2 "$OUT/video/support-clean-station-excerpt.mp4"
"$FF" -v error -y -ss 0 -t 60 -i "$SRC/TBE_Cleaning_Van-Compressed2.mp4" -map 0:v:0 -map 0:a:0 -vf "scale=1280:-2:flags=lanczos" "${X264[@]}" -crf 27 -maxrate 1500k -bufsize 3000k -g 50 -c:a aac -b:a 96k -ac 2 "$OUT/video/support-tbe-cleaning-van-excerpt.mp4"
log "06 enquiry (loop excerpt)"
"$FF" -v error -y -ss 4 -t 24 -i "$SRC/IMG_2236.MOV" -map 0:v:0 -vf "scale=1280:-2:flags=lanczos,fps=30" "${X264[@]}" -crf 27 -maxrate 1600k -bufsize 3200k -g 60 -an "$OUT/video/enquiry-uk-demonstration-loop.mp4"

# ---------- Posters (frames inside each served clip) ----------
frame() { "$FF" -v error -y -ss "$2" -i "$SRC/$1" -frames:v 1 -vf "$3,format=yuvj420p" -q:v 3 "$4"; }
log "posters"
frame "C10-Use-Case-Shorts-Final-Horizontal.mp4" 0.2 "scale=1920:-2:flags=lanczos" "$OUT/poster/hero-c10-use-cases.jpg"
frame "C10 Short Low bitrate.mp4" 3 "scale=1280:-2:flags=lanczos" "$OUT/poster/applications-c10-short.jpg"
frame "5f69a5e2-edb9-4dff-8bd8-14d3a8d570d0.MP4" 5 "scale=720:-2:flags=lanczos" "$OUT/poster/applications-uk-cladding-portrait.jpg"
frame "C10_Introduction_short.mp4" 13.5 "scale=1280:-2:flags=lanczos" "$OUT/poster/system-c10-introduction.jpg"
frame "C10 Academy.mp4" 9.5 "scale=1280:-2:flags=lanczos" "$OUT/poster/support-c10-academy.jpg"
frame "ABZ Clean Station _ Full Setup & Operation Guide.mp4" 54.6 "scale=1280:-2:flags=lanczos" "$OUT/poster/support-clean-station.jpg"
frame "TBE_Cleaning_Van-Compressed2.mp4" 20.5 "scale=1280:-2:flags=lanczos" "$OUT/poster/support-tbe-cleaning-van.jpg"
frame "IMG_2236.MOV" 4.1 "scale=1280:-2:flags=lanczos" "$OUT/poster/enquiry-uk-demonstration.jpg"

# ---------- Application tiles (4:5) — stills from the hero film's chapters + one photograph ----------
log "application tiles"
frame "C10-Use-Case-Shorts-Final-Horizontal.mp4" 16.5 "crop=1728:2160:1596:0,scale=960:1200:flags=lanczos" "$OUT/img/app-solar-panel-cleaning.jpg"
frame "C10-Use-Case-Shorts-Final-Horizontal.mp4" 56.5 "crop=1728:2160:1056:0,scale=960:1200:flags=lanczos" "$OUT/img/app-roof-moss-removal.jpg"
frame "C10-Use-Case-Shorts-Final-Horizontal.mp4" 70.5 "crop=1728:2160:976:0,scale=960:1200:flags=lanczos" "$OUT/img/app-gutter-cleaning.jpg"
"$FF" -v error -y -i "$SRC/C10 3.jpg" -vf "crop=2700:3376:1700:0,scale=960:1200:flags=lanczos,format=yuvj420p" -q:v 3 "$OUT/img/app-facade-cleaning.jpg"

# ---------- Photographs and render ----------
log "photographs"
"$FF" -v error -y -i "$SRC/865A0018.jpg" -vf "scale='min(2048,iw)':-2:flags=lanczos,format=yuvj420p" -q:v 3 "$OUT/img/field-rendered-wall.jpg"
"$FF" -v error -y -i "$SRC/IMG_2240.JPG" -vf "scale=2400:-2:flags=lanczos,format=yuvj420p" -q:v 3 "$OUT/img/field-uk-demonstration.jpg"
"$FF" -v error -y -i "$SRC/C10-2.png" -vf "crop=7576:3392:184:1328,scale=2400:-2:flags=lanczos,format=yuvj444p" -q:v 3 "$OUT/img/render-c10-side.jpg"
log "done"
