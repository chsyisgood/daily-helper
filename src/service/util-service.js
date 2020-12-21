
const panelColorHelper = (index) => {
    const colors = [
        {
            textColor: 'white',
            color: '#DC143C'    //   Crimson
        }, 
        {
            textColor: 'black',
            color: '#66CDAA'    //   Light Green
        }, 
        {
            textColor: 'white',
            color: '#1E90FF'    //   Blue
        }, 
        {
            textColor: 'black',
            color: '#FF8C00'    //   Dark Orange
        }, 
        {
            textColor: 'white',
            color: '#8A2BE2'    //   BlueViolet
        },
        {
            textColor: 'white',
            color: '#FF1493'    // Pink
        }
    ];

    return colors[index % colors.length];
};

module.exports = {
    panelColorHelper
};
