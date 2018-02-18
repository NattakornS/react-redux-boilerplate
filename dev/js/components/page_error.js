import React from 'react';
import {Row,Col} from 'react-bootstrap'
export default (props) => {
    const center = {
        margin: '0 !important',
        position: 'fixed',
        top: '50%',
        left: '50%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    }
    const backgroundColor = {
        position: 'fixed',
    }
    const imgStyle = {
        width: 180,
        paddingTop: 15,
        position: 'absolute',
        transform: 'scaleX(-1)',
    }
    const contentStyle = {
        paddingLeft: 200,
    }
    const codeStyle = {
        fontSize: 140,
        fontWeight: 'bold',
        color: '#000000',
        textShadow: '2px 2px 3px rgba(255,255,255,0.1)',
    }
    const detailStyle = {
        marginTop: -50,
        textTransform: 'uppercase',
        letterSpacing: '2px',
        color: '#DEDEDE',
    }
    const descriptStyle = {
        marginTop: -10,
        color: '#F65353',
    }
    return (
        <div style={backgroundColor}>
            <div style={center}>
                <Row>
                    <Col span={24}>
                        <img style={imgStyle} src="/images/ghost.png" alt="ghost-page-error" />
                        <div style={contentStyle}>
                            <h1 style={codeStyle}>{props.httpResponse.statusCode}</h1>
                            <h3 style={detailStyle}>{props.httpResponse.statusDetail}</h3>
                            <p style={descriptStyle}>{props.httpResponse.statusDescript}</p>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>

    )
}