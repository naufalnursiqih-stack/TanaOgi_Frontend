import { useState, useCallback } from 'react';

/**
 * Manages tooltip state and positioning for interactive map
 * @returns {object} - Tooltip state and handlers
 */
export const useMapTooltip = () => {
    const [tooltip, setTooltip] = useState({
        visible: false,
        content: '',
        x: 0,
        y: 0
    });

    const showTooltip = useCallback((content, event) => {
        setTooltip({
            visible: true,
            content,
            x: event.clientX,
            y: event.clientY
        });
    }, []);

    const updateTooltipPosition = useCallback((event) => {
        setTooltip(prev => ({
            ...prev,
            x: event.clientX,
            y: event.clientY
        }));
    }, []);

    const hideTooltip = useCallback(() => {
        setTooltip(prev => ({
            ...prev,
            visible: false
        }));
    }, []);

    return {
        tooltip,
        showTooltip,
        updateTooltipPosition,
        hideTooltip
    };
};
