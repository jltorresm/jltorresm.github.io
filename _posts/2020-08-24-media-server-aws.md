---
title:      "Simple Streaming Server with AWS"
slug:       "simple-streaming-server-aws"
date:       2020-08-24 00:00:00
categories: cloud
tags:       aws streaming media server cloud architecture
toc:        true
toc_sticky: true
toc_label:  "In this post"
toc_icon:   "video"
header:
  overlay_image:  "/assets/images/streaming.jpg"
  teaser:         "/assets/images/streaming.jpg"
  overlay_filter: rgba(0, 0, 0, 0.5)
  caption:        "Photo by [Pinho](https://unsplash.com/@pinho) on Unsplash"

excerpt: "Learn the basic software architecture decisions we had to make to
build a video streaming server using the AWS infrastructure."

simple_architecture:
  - image_path: /assets/images/2020-08-10-media-server-aws/simple-architecture.jpg
    url:        /assets/images/2020-08-10-media-server-aws/simple-architecture.jpg
    title:      "Simple Media Server Architecture."

prod_architecture:
  - image_path: /assets/images/2020-08-10-media-server-aws/prod-architecture.jpg
    url:        /assets/images/2020-08-10-media-server-aws/prod-architecture.jpg
    title:      "Production grade architecture."
---

On a recent project I've been working, a specialized social network of sorts,
users can post announcements to their communities using a simple WYSIWYG
editor. It is limited to rich format text, and an additional field allows you
to upload photos.

However, from a social network perspective, video has become the new de facto
standard for content sharing. For this reason we wanted to add a simple
mechanism to upload videos and reproduce them in the main social feed.

The video upload seemed simple enough, but when it comes to integrate this
functionality with all the moving parts of the system the problem becomes
much more complex and interesting.

## The Challenge

The app already supports uploading images. We do it via an API, and we store
the processed assets in a S3 bucket. This functionality is not usually a major
concern because most software libraries give us image handling for free
(and on the user's phone the data usage is not massive). The problem arises
when the application supports the capture and display of video.

This type of multimedia brings two dominant obstacles: client bandwidth and
client codec restrictions.

Within the context of a mobile application, we have to consider the bandwidth
to be limited. Internet providers usually cap how much data can be transmitted
and often the speed is truncated based on signal loss. The latter also
produces intermittency in the up connection, but that is a problem beyond the
scope of this particular analysis (I will leave some suggestions about this
point at the end of the article).

Plus, besides the data transfer impediments, mobile applications have to
consider which set of codecs are available in a particular device. Blindly
attempting a playback, without considering codecs, can often result in
unexpected errors in the video player and frustration for the users.


## Why AWS?
Even though there are diverse providers for cloud solutions, AWS has a set of
features that make it easy to build an on-demand media server while fitting
right with the existing application infrastructure and development processes.

If you want to build something similar but don't use the AWS environment,
most of the concepts presented in this article are still valid and can be
adapted to whichever cloud provider you opt to use (or with some hard work
even an in-house solution).

## Chosen Components

### Amazon S3
"Amazon Single Storage Service, is an object storage service that offers
[...] scalability, availability, security and performance"[^s3Intro].

This component serves as the main storage facility for all raw video uploaded
from the users devices. The bucket will keep the original files and will
serve as a source to later perform media conversion to more suitable formats for
viewing in several device types and different bandwidths.

It will, most likely, also store the converted media, possibly in a separated
bucket which will be connected to the distribution layer.

### AWS Elemental MediaConvert
"AWS Elemental MediaConvert is a file-based video transcoding service with
broadcast-grade features."[^mediaConvertIntro].

MediaConvert allows to transform a single source into various output formats
(mp4, HLS, etc.) at different resolutions. Making it possible to distribute
and record the videos on several device types, with different capabilities.

The objective should be to take the single source file and convert it into
HLS (perfect for streaming) in **at least** two different resolutions. One for
low quality reproduction and one for high quality too.

A big caveat for MediaConvert, is that, in order to use captions the
"professional" tier, which is pricier, must be used.

### Amazon Cloudfront
"Amazon CloudFront is a [...] content delivery network (CDN) service that
securely delivers data, videos, applications, and APIs to customers globally
with low latency, [and] high transfer speeds..."[^cloudFrontIntro].

This service will provide geographic distribution of the media content
(namely video), reducing latency for the mobile client and reducing load on
the application servers. This service can also handle the creation of
manifestos for smooth streaming if not already handled by any of the
previously mentioned components.

## Other Alternatives
The components mentioned above are more than enough to handle decent traffic.
However, if your app needs to perform smoothly under higher loads, then you
might need to consider using other AWS services (that are designed
specifically for multimedia) which can handle that kind of stress.

### Amazon Elemental MediaStore
"AWS Elemental MediaStore is optimized to deliver performance to meet the
unique requirements of high-scale, high-quality media workloads (delivering
low-latency reads and writes concurrently)"[^elementalMediaStoreIntro].

MediaStore can be an option if load(traffic) on the application can't be
handled using S3 alone as data store.

### Amazon Elastic Transcoder
"Amazon Elastic Transcoder lets you convert media files that you have stored
in Amazon S3 into media files in the formats required by consumer playback
devices. For example, you can convert large, high-quality digital media files
into formats that users can play back on mobile devices, tablets, web
browsers, and connected televisions"[^elasticTranscoderIntro].

The main reason why this service is as an alternative is because the
MediaConvert component is newer and allows for enough resolutions for our use
case, not mentioning that it is also a bit cheaper if we stick to the
 not professional tier.

## A Word About Pricing
Most of the media service pricing goes by the minute of media, plus the
quality options you choose. To demonstrate pricing models lets build a small
example of how the different components stack up[^currencyNote].

Before continuing, a brief **note**. All cost information is only an exercise to
land the abstract idea of hosting a media server into concrete numbers. These
calculations should not be used as the final word for the costs of the
software solution that is presented in the article.

**Example 1** -
_Transcoding of a 10minute video to SD and HD (revised the 2020-08-10)_.

|Component                                     |10min ~6 GB[^sizeNote] |10min AVC codec<br>SD res @30fps 1 pass |10min AVC codec<br>HD res @30fps 1 pass |
|:---                                          |:---:                  |:---:                                   |:---:                                   |
|S3 - storage[^s3Pricing]                      |0.138                  |---                                     |---                                     |
|S3 - requests                                 |negligible             |---                                     |---                                     |
|S3 - data transfer                            |---                    |---                                     |---                                     |
|S3 - replication                              |---                    |---                                     |---                                     |
|Elemental MediaConvert[^convertPricing]       |---                    |0.075                                   |0.15                                    |
|CloudFront - transfer out[^cloudFrontPricing] |0.51                   |---                                     |---                                     |
|CloudFront - to origin                        |---                    |---                                     |---                                     |
|CloudFront - requests                         |negligible             |---                                     |---                                     |

Which brings the total up to less than a dollar per 10minutes of video. Of
course, you have to also consider other additional side costs that are not
mentioned in this table, such as the cost to implement and host the API that
will communicate with a mobile client, the cost of that mobile app, etc.
However, this example can give you an idea of the cost of transcoding and
hosting the media files alone.

**Example 2** - 
_Cost of transcoding to SD and HD per hour of video (revised the 2020-08-10)_.

|Component                                     |1h ~54 GB[^sizeNote]   |1h AVC codec<br>SD res @30fps 1 pass |1h AVC codec<br>HD res @30fps 1 pass |
|:---                                          |:---:                  |:---:                                |:---:                                |
|S3 - storage[^s3Pricing]                      |1.238                  |---                                  |---                                  |
|S3 - requests                                 |negligible             |---                                  |---                                  |
|S3 - data transfer                            |---                    |---                                  |---                                  |
|S3 - replication                              |---                    |---                                  |---                                  |
|Elemental MediaConvert[^convertPricing]       |---                    |0.45                                 |0.9                                  |
|CloudFront - transfer out[^cloudFrontPricing] |4.59                   |---                                  |---                                  |
|CloudFront - to origin                        |---                    |---                                  |---                                  |
|CloudFront - requests                         |negligible             |---                                  |---                                  |

Again, these are just estimates and values can vary depending on the length and
quality of the video besides from the amount of transcoding and data transfer
that takes place. Take the numbers with a grain of salt.

## High Level Architecture
Based on the analysis done and AWS's recommendations the high level
architecture would look something like this:
 
{% include gallery id="simple_architecture" layout="align-center" caption="Simple Media Server Architecture." %}

Where the user is the one triggering the whole process by choosing to upload
a video file. Then, our cloud infrastructure does the whole processing in a
transparent and asynchronous fashion.

## Production Grade Architecture
_Automating The Data Transformation Process_

To achieve full automation of the transcoding process we need to add a few
other components that will handle communication between steps and finally
with the end user. 

With the full suite of services in place the architecture would look more
like this:

{% include gallery id="prod_architecture" layout="align-center" caption="Production grade architecture." %}

The user triggers the process by choosing the video file from the mobile app.
This initiates 2 actions: a direct upload to an S3 bucket (via pre-signed AWS
objects), and a request to the app's API to save the video's basic metadata.

When the S3 bucket receives the full data, a lambda function will pick the
event up to start the transcoding process. The conversion itself happens within
the MediaConvert service, but it is initiated by the lambda function.

The resulting files will go to another S3 bucket where they will be stored
and later access by the user. However, the files won't be directly accesible
from the bucket, it will go through a CloudFormation distribution which will
provide a secure connection (HTTPS) and geographical distribution (CDN).

Once the transcoding ends, CloudWatch will be called to notify the API of
the outcome of the process. If it ends successfully some more metadata
(resolution, size, etc.) will be sent from AWS to the API to complete the DB
record. Otherwise, the message will carry the error state so that the record
in the API's DB is updated accordingly as well.

### Upload Resilience
Depending on the requirements of your application, and the tolerance of your
users, the upload process must be quite robust. The recommended approach is
to implement multipart uploads, AWS supports doing so via special upload
commands.

This will enable your mobile application to fail uploading a part, because of
network loss for example, and later resume when connection is back.

## Further Reading

**Tutorial**. Media Streaming | CDN, Video Hosting, Distribution.<br>
"Amazon CloudFront media streaming tutorials".
[Go to tutorial](https://aws.amazon.com/cloudfront/streaming/).
{: .notice--warning}

**Tutorial**. Video on Demand | AWS Solutions.<br>
"Video on Demand on AWS".
[Go to tutorial](https://aws.amazon.com/solutions/implementations/video-on-demand-on-aws/).
{: .notice--warning}

**Tutorial**. Video On Demand Automation : Serverless watch folder.<br>
"VOD Automation Part 1".
[Read article](https://aws.amazon.com/blogs/media/vod-automation-part-1-create-a-serverless-watchfolder-workflow-using-aws-elemental-mediaconvert/).
{: .notice--warning}

**Tutorial**.<br>
"Automatically trigger MediaConvert jobs on S3 objects and get notifications when the jobs finish".
[Read article](https://github.com/aws-samples/aws-media-services-vod-automation/blob/master/MediaConvert-WorkflowWatchFolderAndNotification/README-tutorial.md).
{: .notice--warning}

**Case Study**. Hulu Case Study.<br>
"Redefining the television experience for viewers".
[Read full case study](https://aws.amazon.com/solutions/case-studies/hulu/).
{: .notice--warning}

**Case Study**. PBS Case Study.<br>
"Deliver to individual communities through its nearly 360 member stations".
[Read full case study](https://aws.amazon.com/solutions/case-studies/pbs/).
{: .notice--warning}

**Article**. HTTP Live Streaming (HLS) Protocol.<br>
"HTTP Live Streaming".
[Read article](https://en.wikipedia.org/wiki/HTTP_Live_Streaming).
{: .notice--warning}

**Documentation**.<br>
"Amazon Simple Storage Service Documentation".
[Go to docs](https://docs.aws.amazon.com/s3).
{: .notice--warning}

**Documentation**.<br>
"AWS Elemental MediaConvert Documentation".
[Go to docs](https://aws.amazon.com/mediaconvert/).
{: .notice--warning}

**Documentation**.<br>
"Amazon CloudFront Documentation".
[Go to docs](https://aws.amazon.com/cloudfront/).
{: .notice--warning}

**Documentation**.<br>
"AWS Elemental MediaStore Documentation".
[Go to docs](https://aws.amazon.com/mediastore/).
{: .notice--warning}

**Documentation**.<br>
"Amazon Elastic Transcoder Documentation".
[Go to docs](https://aws.amazon.com/elastictranscoder).
{: .notice--warning}

## Footnotes and References

[^s3Intro]: Amazon S3. [URL](https://aws.amazon.com/s3). Accessed: 2020-04-27.
[^mediaConvertIntro]: AWS Elemental MediaConvert. [URL](https://aws.amazon.com/mediaconvert). Accessed: 2020-04-27.
[^cloudFrontIntro]: Amazon CloudFront. [URL](https://aws.amazon.com/cloudfront). Accessed: 2020-04-27.
[^elementalMediaStoreIntro]: AWS Elemental MediaStore. [URL](https://aws.amazon.com/mediastore). Accessed: 2020-04-27.
[^elasticTranscoderIntro]: Amazon Elastic Transcoder Documentation. [URL](https://docs.aws.amazon.com/elastic-transcoder). Accessed: 2020-04-27.
[^currencyNote]: All values are shown in USD, and all calculations are high level estimates using "US East (Ohio)" region unless specified otherwise.
[^sizeNote]: Estimated size of the original file plus the transcoded versions, for a video recorded using a modern cellphone.
[^s3Pricing]: Based on "Amazon S3 pricing". [URL](https://aws.amazon.com/s3/pricing). Accessed: 2020-04-27.
[^cloudFrontPricing]: Based on "Amazon CloudFront Pricing". [URL](https://aws.amazon.com/cloudfront/pricing). Accessed: 2020-04-27.
[^convertPricing]: Based on "AWS Elemental MediaConvert Pricing". [URL](https://aws.amazon.com/mediaconvert/pricing). Accessed: 2020-04-27.
