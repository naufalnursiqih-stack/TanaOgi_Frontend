import React, { useState } from 'react';

/**
 * ImageWithShimmer Component
 * Renders an animated shimmer block placeholder while the target image is loading,
 * and performs a smooth fade-in once the image loading finishes.
 */
export default function ImageWithShimmer({ src, alt, className, imgClassName, style = {}, imgStyle = {} }) {
    const [loaded, setLoaded] = useState(false);

    const outerStyle = {
        position: 'relative',
        width: style.width || '100%',
        height: style.height || '100%',
        overflow: 'hidden',
        borderRadius: style.borderRadius || 'inherit',
        ...style
    };

    return (
        <div style={outerStyle} className={className}>
            {/* Shimmer Placeholder skeleton */}
            {!loaded && (
                <div 
                    className="shimmer-box" 
                    style={{ 
                        position: 'absolute', 
                        inset: 0, 
                        zIndex: 2, 
                        width: '100%', 
                        height: '100%',
                        borderRadius: style.borderRadius || 'inherit'
                    }} 
                />
            )}
            
            {/* Real Image */}
            <img
                src={src}
                alt={alt}
                onLoad={() => setLoaded(true)}
                className={imgClassName}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: imgStyle.objectFit || style.objectFit || 'cover',
                    opacity: loaded ? 1 : 0,
                    transition: 'opacity 0.6s ease-in-out, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                    position: loaded ? 'relative' : 'absolute',
                    top: 0,
                    left: 0,
                    borderRadius: style.borderRadius || 'inherit',
                    ...imgStyle
                }}
            />
        </div>
    );
}
