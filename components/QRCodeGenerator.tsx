"use client";

import React from 'react';
import QRCode from 'qrcode.react';
import { Card, CardContent } from '@/components/ui/card';

interface ImageSettings {
  src: string;
  width: number;
  height: number;
  opacity: number;
  centerImage: boolean;
  x: number;
  y: number;
}

interface QRCodeGeneratorProps {
  content: string;
  type: string;
  fgColor: string;
  bgColor: string;
  size: number;
  errorLevel: string;
  margin: number;
  title: string;
  imageSettings: ImageSettings;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({
  content,
  type,
  fgColor,
  bgColor,
  size,
  errorLevel,
  margin,
  title,
  imageSettings
}) => {
  if (!content) return null;

  const getQRCodeValue = () => {
    switch (type) {
      case 'url':
        return content.startsWith('http') ? content : `https://${content}`;
      case 'vcard':
        const [firstName, lastName, phone, email, company, street, city, zip, state, country, website] = content.split('\n');
        return `BEGIN:VCARD
VERSION:3.0
FN:${firstName} ${lastName}
TEL:${phone}
EMAIL:${email}
ORG:${company}
ADR:;;${street};${city};${state};${zip};${country}
URL:${website}
END:VCARD`;
      case 'email':
        const [emailAddress, subject, body] = content.split('\n');
        return `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      case 'phone':
        return `tel:${content}`;
      case 'sms':
        return `sms:${content}`;
      case 'wifi':
        const [ssid, password] = content.split(',');
        return `WIFI:S:${ssid};T:WPA;P:${password};;`;
      case 'twitter':
        return `https://twitter.com/${content}`;
      case 'facebook':
        return `https://facebook.com/${content}`;
      case 'maps':
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(content)}`;
      default:
        return content;
    }
  };

  const imageStyle: React.CSSProperties = {
    width: imageSettings.width,
    height: imageSettings.height,
    opacity: imageSettings.opacity,
  };

  if (imageSettings.centerImage) {
    imageStyle.left = '50%';
    imageStyle.top = '50%';
    imageStyle.transform = 'translate(-50%, -50%)';
  } else {
    imageStyle.left = imageSettings.x;
    imageStyle.top = imageSettings.y;
  }

  return (
    <Card>
      <CardContent className="flex flex-col items-center p-6">
        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
        <QRCode
          value={getQRCodeValue()}
          size={size}
          fgColor={fgColor}
          bgColor={bgColor}
          level={errorLevel as "L" | "M" | "Q" | "H"}
          includeMargin={true}
          imageSettings={imageSettings.src ? {
            src: imageSettings.src,
            width: imageSettings.width,
            height: imageSettings.height,
            excavate: true,
          } : undefined}
          style={{ marginTop: margin, marginBottom: margin, marginLeft: margin, marginRight: margin }}
        />
      </CardContent>
    </Card>
  );
};

export default QRCodeGenerator;