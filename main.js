(function horizontalScrollingBanner() {
    let banners = document.getElementsByClassName('horizontal-scrolling-banner');
    if (!banners || banners.length === 0) {
      return;
    }
    let pxPerSecond = 50;
    setUpElements();
    scrollTheBanners();
    window.addEventListener('resize', setUpElements);
  
    function setUpElements() {
      for (let i = 0; i < banners.length; i++) {
        let currentBanner = banners[i];
        let helperWrapperClass = 'horizontal-scrolling-banner__helper-wrapper';
        let currentHelperWrapper = currentBanner.querySelector('.' + helperWrapperClass);
        if (currentHelperWrapper) {
          let clones = currentHelperWrapper.querySelectorAll('[data-clone]');
          Array.prototype.forEach.call(clones, function(clone) {
            clone.remove();
          });
          let childrenCount = currentHelperWrapper.children.length;
          for (let i = 0; i < childrenCount; i++) {
            currentBanner.appendChild(currentHelperWrapper.children[0]);
          }
          currentHelperWrapper.remove();
        }
  
        let children = currentBanner.children;
  
        let bannerWidth = currentBanner.getBoundingClientRect().width;
        let minWidthToCoverBanner = (bannerWidth * 2) + children[0].getBoundingClientRect().width;
        let childrenWidth = Array.prototype.reduce.call(children, function(r, child) {
          return r + child.getBoundingClientRect().width;
        }, 0);
        let currentWidth = childrenWidth;
  
  
        do {
          Array.prototype.forEach.call(children, function(child) {
            let clone = child.cloneNode();
            clone.setAttribute('aria-hidden', true);
            clone.dataset.clone = true;
            currentBanner.appendChild(clone);
          });
          currentWidth += childrenWidth;
        } while (currentWidth < minWidthToCoverBanner);
  
        let transitionHelperWrapper = document.createElement('div');
        transitionHelperWrapper.classList.add('horizontal-scrolling-banner__helper-wrapper');
        let childrenCount = children.length;
        for (let i = 0; i < childrenCount; i++) {
          transitionHelperWrapper.appendChild(children[0]);
        }
        currentBanner.appendChild(transitionHelperWrapper);
        transitionHelperWrapper.dataset.childrenWidth = childrenWidth;
      }
    }
  
    function scrollTheBanners() {
      for (let i = 0; i < banners.length; i++) {
        let helperWrapper = banners[i].firstElementChild;
        let childrenWidth = helperWrapper.dataset.childrenWidth;
        let offsetLeft = helperWrapper.offsetLeft;
  
        if (offsetLeft <= (childrenWidth * -1)) {
          helperWrapper.style.transitionDuration = '0s';
          helperWrapper.style.left = '0px';
          helperWrapper.style.removeProperty('transition-duration');
        } else if (helperWrapper.style.left === '' || helperWrapper.style.left === '0px') {
          setTimeout(function() {
            helperWrapper.style.transitionDuration = (childrenWidth / pxPerSecond).toFixed() + 's';
            helperWrapper.style.left = (childrenWidth * -1) + 'px';
          }, 0);
        }
      }
      requestAnimationFrame(scrollTheBanners);
    }
  })();