#!/usr/bin/bash

# ----------------------------------------
# Explanation:
# This script checks if a filename argument has been provided when running the script.
# If no argument is provided, it displays a helpful usage message and exits with an error code.

# Checking for Arguments:
# The square brackets '[ ]' are used to test conditions. The "$#" represents the number of arguments passed to the script.
# The "-eq" means "equal to". So, if the number of arguments is 0 (meaning no arguments provided), the condition is true.

# Displaying a Message:
# The 'echo' command prints messages to the screen. Here, it prints a usage message.
# The "$0" is a special variable that represents the script's name.
# The '<file_to_run>' indicates that a filename should be provided in place of '<file_to_run>'.

# Exiting the Script:
# The 'exit' command is used to terminate the script.
# The number '1' after 'exit' is an error code. It's a common practice to use non-zero codes to indicate an error.
# ----------------------------------------

# Check if a file argument is provided
if [ "$#" -eq 0 ]; then
    echo "Usage: $0 <file_to_run>"
    exit 1
fi


# ----------------------------------------
# set 'FLASK' environment: toggle
# development and production
# comment out to turn of, uncomment to turn on.
# ----------------------------------------
export FLASK_ENV=development

# export FLASK_ENV=production

# ----------------------------------------
# set 'FLASK' file0 to run using the provided argument
# ----------------------------------------
export FLASK_APP="$1"

# ----------------------------------------
# run file : open server
# ----------------------------------------
flask run
