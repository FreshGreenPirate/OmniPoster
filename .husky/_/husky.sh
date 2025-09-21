#!/bin/sh
if [ -z "$husky_skip_init" ]; then
  debug () {
    [ "$HUSKY_DEBUG" = "1" ] && echo "husky (debug) - $1"
  }

  readonly husky_skip_init=1
  export husky_skip_init

  [ "$HUSKY" = "0" ] && debug "HUSKY env variable is set to 0, skipping hook" && exit 0
  if [ -z "$husky_skip_init" ]; then
    debug "env var husky_skip_init is not set, skip"
    exit 0
  fi

  debug "Running Husky hook"
fi
