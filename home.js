const socket=io();
if(navigator.geolocation){
    navigator.geolocation.watchPosition((pos)=>{
        const {latitude,longitude}=pos.coords;
        socket.emit("send-location",{latitude,longitude});

    },(error)=>{
        console.error(error)
    },
    {enableHighAccuracy:true,
        maximumAge:0,
        timeout:4000
    }
    
);
}


const map=L.map("map").setView([0,0],10);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution:"ramanujan college"
}).addTo(map)



const markers={


};
socket.on("receive-location",(data)=>{
    const {id,latitude,longitude}=data;
    map.setView([latitude,longitude],);
    if(markers[id]){
        markers[id].setLatlng([latitude,longitude]);}
        else{
         markers[id]=L.marker([latitude,longitude]).addTo(map);   
    }
});
socket.on("user-disconnected",(id)=>{
    if(markers[id]){
        map.removelayer(markers[id]);
        delete markers[id];
    }
})