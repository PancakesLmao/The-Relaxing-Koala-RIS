export default function Map() {
const mapStyles = {
    mapswrapper: {
        background: '#fff',
        position: 'relative',
    },
    iframe: {
        width: '100%',
        height: '300px',
        loading: 'lazy',
        allowFullScreen: true,
        border: 0,
        position: 'relative',
        zIndex: 2,
    },
    link: {
        color: 'rgba(0, 0, 0, 0)',
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 0,
    },
};

return (
    <>
        <div id="map">
            <div style={mapStyles.mapswrapper}>
                <iframe
                    title="Restaurant Location"
                    src={"https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=swinburne%20vietnam&zoom=15&maptype=roadmap"}
                    style={mapStyles.iframe}
                ></iframe>
                <a href="#" style={mapStyles.link}></a>
            </div>
        </div>
    </>
);
}
