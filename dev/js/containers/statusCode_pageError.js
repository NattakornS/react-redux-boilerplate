import React, { Component } from 'react';

import PageError from '../components/page_error';

export default (props) => {

    const httpResponse = {
        error_404: {
            statusCode: 404,
            statusDetail: 'Page Not Found.',
            statusDescript: 'The requested URL was not found on this server.',
        },
        error_401: {
            statusCode: 401,
            statusDetail: 'Unauthorized.',
            statusDescript: 'The user does not have the necessary credentials.',
        },
        error_500: {
            statusCode: 500,
            statusDetail: 'Internal Server Error.',
            statusDescript: '',
        }
    }

    return (
        <PageError
            httpResponse={httpResponse['error_' + httpResponse[`error_${props.statusCode}`].statusCode]}
        />
    )
}



