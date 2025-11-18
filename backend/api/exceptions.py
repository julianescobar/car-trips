from rest_framework.views import exception_handler

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None:
        response.data = {
            "status": "error",
            "code": getattr(exc, 'default_code', 'error'),
            "message": response.data.get('detail', 'An error occurred.'),
            "fields": {k: v for k, v in response.data.items() if k != 'detail'}
        }

    return response