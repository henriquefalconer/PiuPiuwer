class GeneralFunctions {
    static sortPius(pius){
        pius.sort(function(a, b){return GeneralFunctions.getTimeFromPiuId(b.piuId) - GeneralFunctions.getTimeFromPiuId(a.piuId)});
        pius.sort(function(a, b){return b.hasDestaque() - a.hasDestaque()});
    }

    static getUserNameFromPiuId(piuId){
        return (piuId == null) ? null : piuId.split(":")[0];
    }

    static getTimeFromPiuId(piuId){
        return (piuId == null) ? null : piuId.split(":")[1];
    }

    static getRelativeTime(timeInMilliseconds) {
        var relativeTime = "";

        var currentTime = Date.parse(new Date());

        var differenceInSeconds = (currentTime - timeInMilliseconds)/1000;

        if (differenceInSeconds < 60) {
            relativeTime = differenceInSeconds.toFixed(0) + " s";
        } else if (differenceInSeconds < 3600) {
            relativeTime = (differenceInSeconds/60).toFixed(0) + " min";
        } else if (differenceInSeconds < 3600*24) {
            relativeTime = (differenceInSeconds/3600).toFixed(0) + " h";
        } else {
            relativeTime = (differenceInSeconds/3600/24).toFixed(0) + " dia";
            if ((differenceInSeconds/3600/24).toFixed(0) > 1) relativeTime = relativeTime + "s";
        }

        return relativeTime;
    }

    static createImgElement(classList, alt, src) {
        var img = document.createElement("img");
        classList.forEach(function(classItem){
            img.classList.add(classItem);
        });
        img.alt = alt;
        img.src = src;
        return img;
    }

    static getDateFromMilisseconds(milliseconds) {
        const date = new Date(milliseconds);
        return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    }
}