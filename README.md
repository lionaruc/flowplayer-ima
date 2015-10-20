#IMA SDK Plugin for Flowplayer 6 HTML5 version

##Licence
IMA SDK plugin for Flowplayer HTML5.
For more information see https://www.github.com/angelfish-io/flowplayer-ima
 
Copyright (C) 2015 **Angelfish AS** - Istanbul
 
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
 
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
 
You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
 
- Author : [frkcn](https://github.com/frkcn) - **Angelfish AS**
- Web : http://angelfish.io

##Introduction
This plugin provides easy google IMA SDK integration for the Flowplayer HTML5.

This plugin is currently in the development phase. So you can send feedback and your opinion.

Try our [sample](https://angelfish.io/imaplugin).

##Features
- Video ads pause, resume, volume control with using flowplayer controlbar and keyboard shortcuts.
- Ad event callbacks.
- Ads fullscreen resizable option.
- Optional time for overlay and midroll ads.
- Optional auto ad play.
- Multiple Flowplayer Instances on One Page with ads.

##Requirements
  - Flowplayer HTML5 version 6.x.x
  - Jquery v1.7.2+

##Getting started
Download the source and integrate your flowplayer.

index.html file content with plugin setup configuration.

```html
<!DOCTYPE html>
<head>
	<link rel="stylesheet" type="text/css" href="//releases.flowplayer.org/6.0.3/skin/functional.css" />
	<script src="//code.jquery.com/jquery-1.11.2.min.js"></script>
	<script type="text/javascript" src="//releases.flowplayer.org/6.0.3/flowplayer.min.js"></script>
	<link rel="stylesheet" type="text/css" href="style.css">
<body>
<div id="mainContainer">
	<div id="content" class="player">
		<video id="contentElement">
			<source type="video/mp4" src="//rmcdn.2mdn.net/Demo/vast_inspector/android.mp4">
		</video>
	</div>
</div>

<script type="text/javascript" src="//imasdk.googleapis.com/js/sdkloader/ima3.js"></script>
<script type="text/javascript" src="ads.js"></script>

<script>
	$(function(){
		var angConf = {
			videoContent: "#content",
			ads: [
				{
					type: "preroll",
					adTagUrl: "https://googleads.g.doubleclick.net/pagead/ads?client=ca-video-pub-PUBID&slotname=124319096&ad_type=video_text_image_flash&description_url=http%3A%2F%2Fexample.com&max_ad_duration=30000&sdmax=30000&videoad_start_delay=0&overlay=0"
				},
				{
					type: "overlay",
					adTagUrl: "https://googleads.g.doubleclick.net/pagead/ads?client=ca-video-pub-PUBID&slotname=124319096&ad_type=text_image_flash&description_url=http%3A%2F%2Fexample.com&max_ad_duration=30000&sdmax=30000&videoad_start_delay=5&overlay=1"
				},
				{
					type: "midroll",
					adTagUrl: "http://pubads.g.doubleclick.net/gampad/ads?slotname=/124319096/external/ad_rule_samples&sz=640x480&ciu_szs=300x250&unviewed_position_start=1&output=xml_vast3&impl=s&env=vp&gdfp_req=1&ad_rule=0&vad_type=linear&vpos=midroll&pod=2&mridx=1&ppos=1&lip=true&min_ad_duration=0&max_ad_duration=30000&cust_params=deployment%3Ddevsite%26sample_ar%3Dpremidpost&url=&video_doc_id=short_onecue&cmsid=496"
				},
				{
					type: "postroll",
					adTagUrl: "https://googleads.g.doubleclick.net/pagead/ads?client=ca-video-pub-PUBID&slotname=124319096&ad_type=video_text_image_flash&description_url=http%3A%2F%2Fexample.com&max_ad_duration=30000&sdmax=30000&videoad_start_delay=-1&overlay=0"
				}
			]
		};

		angVideo(angConf);
	});
</script>

</body>
</html>
```

**Ad Tag Urls just sample. You must change urls.**

##Ads Type and Times
- Preroll ads : before starting video
- Overlay ads : 10th second
- Midroll ads : 60th second
- Postroll ads: After video finished

##Used Libraries
- [class-list](//www.npmjs.com/package/class-list)
- [bean](//github.com/fat/bean)

##Where do I report issues?
Please report issues on the issues page.