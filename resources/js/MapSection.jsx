import React, { useState, useEffect } from 'react';
import { mapRegions } from '../data/mapRegions';
import { regionDetails } from '../data/regionDetails';
import { useMapTooltip } from '../hooks/UseMapTooltip';

const MapSection = () => {
    const [selectedRegionId, setSelectedRegionId] = useState(null);
    const [islands, setIslands] = useState([]);
    const [loading, setLoading] = useState(true);
    const { tooltip, showTooltip, updateTooltipPosition, hideTooltip } = useMapTooltip();

    useEffect(() => {
        fetch('/api/islands')
            .then(res => res.json())
            .then(resData => {
                if (resData.status === 'success') {
                    setIslands(resData.data);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching islands:', err);
                setLoading(false);
            });
    }, []);

    const handleRegionClick = (regionId) => {
        setSelectedRegionId(regionId);
        console.log('Exploring region ID:', regionId);
    };

    const selectedIsland = islands.find(i => i.slug === selectedRegionId);
    const hasDbData = !!selectedIsland;
    const title = hasDbData ? selectedIsland.name : (regionDetails[selectedRegionId]?.title || '');
    const image = hasDbData ? selectedIsland.image_url : (regionDetails[selectedRegionId]?.image || '');
    const tagline = hasDbData ? selectedIsland.tagline : (regionDetails[selectedRegionId]?.tagline || '');
    const description = hasDbData ? (selectedIsland.header_desc || selectedIsland.overview_text) : (regionDetails[selectedRegionId]?.description || regionDetails[selectedRegionId]?.headerDesc || '');
    const destinations = hasDbData ? (selectedIsland.destinations || []) : [];
    const link = hasDbData ? `#/region/${selectedIsland.slug}` : (regionDetails[selectedRegionId]?.link || '#/');

    return (
        <section className="py-20 bg-white text-on-background overflow-hidden transition-all duration-1000 opacity-100" id="map-section">
            <div className="w-full max-w-container-max mx-auto px-margin-desktop">


                {/* Map Container */}
                <div className="relative w-full aspect-[18/9] lg:aspect-[21/9] mx-auto bg-[#eef5fc] rounded-[40px] p-4 md:p-6 border border-[#c9d8e8] shadow-md flex items-center justify-center group/map">
                    {/* SVG Map */}
                    <svg 
                className="w-full h-full max-h-[600px] object-contain drop-shadow-[0_12px_24px_rgba(77,136,180,0.15)]" 
                viewBox="280 80 400 400" 
                xmlns="http://www.w3.org/2000/svg"
            >
                        {/* Define Glow Filter */}
                        <defs>
                            <filter id="glow">
                                <feGaussianBlur result="coloredBlur" stdDeviation="2.5" />
                                <feMerge>
                                    <feMerge in="coloredBlur" />
                                    <feMerge in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
 
                        {/* Render Island Groups */}
                        {mapRegions.map((region) => (
                            <g 
                                key={region.id} 
                                data-region-id={region.id}
                                className="island-group cursor-pointer"
                                onClick={() => handleRegionClick(region.id)}
                                onMouseEnter={(e) => showTooltip(region.name, e)}
                                onMouseMove={updateTooltipPosition}
                                onMouseLeave={hideTooltip}
                            >
                                {/* Paths */}
                                {region.paths && region.paths.map((path, idx) => (
                                    <path 
                                        key={`path-${idx}`}
                                        className="island-path" 
                                        d={path}
                                    />
                                ))}

                                {/* Island Labels on Top */}
                                {region.labelPosition && (
                                    <text
                                        x={region.labelPosition.x}
                                        y={region.labelPosition.y}
                                        className="map-label"
                                    >
                                        {region.name}
                                    </text>
                                )}
                            </g>
                        ))}
                    </svg>

                </div>

                {/* Selected Region Info */}
                {selectedRegionId && (regionDetails[selectedRegionId] || selectedIsland) && (
                    <div className="mt-8 text-center animate-fade-in">
                        <p className="text-on-primary-container">
                            Anda sedang menjelajahi: <span className="font-bold text-spice-gold">{title}</span>
                        </p>
                    </div>
                )}
            </div>

            {/* Backdrop Overlay */}
            {selectedRegionId && (
                <div 
                    className="fixed inset-0 bg-primary/60 backdrop-blur-sm z-40 animate-fade-in"
                    onClick={() => setSelectedRegionId(null)}
                />
            )}

            {/* Sidebar Details Drawer Card */}
            {selectedRegionId && (regionDetails[selectedRegionId] || selectedIsland) && (
                <div className="fixed top-0 right-0 h-full w-full sm:w-[480px] bg-surface text-primary shadow-2xl z-50 animate-slide-in flex flex-col">
                    {/* Header Image */}
                    <div className="relative h-[240px] w-full shrink-0 overflow-hidden">
                        <img 
                            src={image} 
                            alt={title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-transparent to-primary/80" />
                        
                        {/* Close button on Top Right */}
                        <button 
                            onClick={() => setSelectedRegionId(null)}
                            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-primary/40 backdrop-blur-md text-surface flex items-center justify-center hover:bg-primary/70 transition-all cursor-pointer border border-surface/10"
                        >
                            <span className="material-symbols-outlined text-[20px] font-bold">close</span>
                        </button>
                    </div>

                    {/* Content Details */}
                    <div className="p-6 flex-1 flex flex-col justify-between overflow-y-auto scrollbar-thin">
                        <div className="space-y-6">
                            {/* Title & Tagline */}
                            <div>
                                <h3 className="font-headline-lg text-headline-lg text-primary leading-tight">
                                    {title}
                                </h3>
                                {tagline && (
                                    <p className="text-secondary font-label-md tracking-wider mt-1">
                                        {tagline}
                                    </p>
                                )}
                            </div>
                            
                            {/* Description */}
                            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                                {description}
                            </p>

                            {/* Destinasi Unggulan */}
                            {destinations.length > 0 && (
                                <div className="pt-2">
                                    <h4 className="font-label-lg text-label-lg text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-spice-gold">explore</span>
                                        3 Destinasi Unggulan
                                    </h4>
                                    <div className="space-y-3">
                                        {destinations.map((dest) => (
                                            <div 
                                                key={dest.id} 
                                                className="flex gap-4 p-3 bg-surface-container-low hover:bg-surface-container rounded-2xl border border-outline-variant/30 transition-all group"
                                            >
                                                <img 
                                                    src={dest.image_url} 
                                                    alt={dest.name} 
                                                    className="w-16 h-16 object-cover rounded-xl shadow-sm shrink-0" 
                                                />
                                                <div className="flex-1 min-w-0 flex flex-col justify-between">
                                                    <div className="flex justify-between items-start gap-1">
                                                        <h5 className="font-semibold text-primary truncate group-hover:text-secondary transition-colors">
                                                            {dest.name}
                                                        </h5>
                                                        <span className="text-body-sm text-spice-gold flex items-center shrink-0">
                                                            <span className="material-symbols-outlined text-[14px] fill-current mr-0.5">star</span>
                                                            {parseFloat(dest.rating).toFixed(1)}
                                                        </span>
                                                    </div>
                                                    <p className="text-body-sm text-on-surface-variant line-clamp-1">
                                                        {dest.tagline}
                                                    </p>
                                                    <div className="flex justify-between items-center mt-1">
                                                        <span className="text-[11px] bg-primary/5 text-primary px-2 py-0.5 rounded-full">
                                                            {dest.category}
                                                        </span>
                                                        <span className="text-[11px] text-secondary font-medium">
                                                            {dest.duration}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* CTA button */}
                        <div className="mt-8 pt-4 border-t border-outline-variant/30">
                            <a 
                                href={link}
                                className="w-full py-3.5 border-2 border-primary text-primary hover:bg-primary hover:text-surface text-center font-label-lg rounded-[12px] transition-all duration-300 block font-semibold hover:shadow-lg active:scale-[0.98] cursor-pointer"
                            >
                                Jelajahi Pulau Selengkapnya
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* Tooltip */}
            {tooltip.visible && (
                <div 
                    id="map-tooltip"
                    className="fixed bg-[#0b1f2a] text-white px-4 py-2 rounded-xl shadow-xl border border-white/10 font-label-lg pointer-events-none z-50 transition-all duration-200"
                    style={{
                        left: tooltip.x + 15,
                        top: tooltip.y + 15,
                        zIndex: 9999,
                        pointerEvents: 'none'
                    }}
                >
                    {tooltip.content}
                </div>
            )}
        </section>
    );
};

export default MapSection;
