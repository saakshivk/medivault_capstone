class ForceUTF8CharsetMiddleware:
    """
    Ensure text responses always declare UTF-8 so emoji/icons do not mojibake.
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        content_type = response.get("Content-Type", "")
        if (
            ("text/html" in content_type or "text/css" in content_type or "javascript" in content_type)
            and "charset=" not in content_type.lower()
        ):
            response["Content-Type"] = f"{content_type}; charset=utf-8"
        return response
