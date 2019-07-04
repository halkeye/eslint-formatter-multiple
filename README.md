# @halkeye/eslint-format-all

A meta formatter for eslint that will output to multiple formats

# Usage

Update your package.json to have a new section:

```
  "eslint-format-all": {
    "formatters": [
      {
        "name": "stylish",
        "output": "console"
      },
      {
        "name": "checkstyle",
        "output": "file",
        "path": "eslint-checkstyle.xml"
      }
    ]
  }
```
