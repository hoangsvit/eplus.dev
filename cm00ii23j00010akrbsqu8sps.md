---
title: "Self review: Song selection - React Basic"
seoTitle: "Self review: Song selection - React Basic"
seoDescription: "Self review: Song selection - React Basic"
datePublished: Mon Aug 19 2024 04:44:45 GMT+0000 (Coordinated Universal Time)
cuid: cm00ii23j00010akrbsqu8sps
slug: self-review-song-selection-react-basic
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1724042626882/86a3ff18-651d-4ef8-a5ef-cbfe4b7969d8.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1724042675345/114ce7b4-e57b-4b1e-b965-5c8baa1acf85.png
tags: self-review-song-selection-react-basic

---

1. **In plain JavaScript, how do you build an instance of the Audio constructor?**
    
    * <mark>new Audio();</mark>
        
    * New Audio();
        
    * Audio();
        
2. **If an object instance of the Audio constructor is saved in a variable named “song”, what property on the “song” object can you use to check if the song is currently playing?**
    
    * <mark>song.paused</mark>
        
    * song.pause();
        
    * song.play()
        
3. What is wrong with this code?
    
    ```javascript
    function toggle() {
        if(song.paused) {
            song.pause()
        } else {
            song.play()
        }
    }
    ```
    
    * <mark>The app's logic doesn't work. The code on line 3 and the code on line 5 should swap places.</mark>
        
    * The condition in the if statement is wrong. It should be:
        
        if(song.paused())
        
    * You need to have an else if condition, in between the if and else conditions.