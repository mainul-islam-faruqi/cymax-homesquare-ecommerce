module.exports.description = 'Add image optimization fields';

module.exports.up = (migration) => {
  // Add your UP migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const image = migration.editContentType('image')

  image
    .createField('alt')
    .name('Alternative Text')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)

  image
    .createField('width')
    .name('Width')
    .type('Integer')
    .localized(false)
    .required(false)
    .validations([
      {
        range: {
          min: 0,
          max: 3999,
        },
        message: 'The maximum image width is 4000px',
      },
    ])
    .disabled(false)
    .omitted(false)

  image.changeFieldControl('width', 'builtin', 'numberEditor', {
    helpText:
      'You can resize the image to the desired width and height. The maximum allowed value is 4000 pixels. The default is the original image width and height.',
  })

  image
    .createField('height')
    .name('Height')
    .type('Integer')
    .localized(false)
    .required(false)
    .validations([
      {
        range: {
          min: 0,
          max: 3999,
        },
        message: 'The maximum image height is 4000px',
      },
    ])
    .disabled(false)
    .omitted(false)

  image.changeFieldControl('height', 'builtin', 'numberEditor', {
    helpText:
      'You can resize the image to the desired width and height. The maximum allowed value is 4000 pixels. The default is the original image width and height.',
  })

  image
    .createField('quality')
    .name('Image Quality')
    .type('Integer')
    .localized(false)
    .required(false)
    .validations([
      {
        range: {
          min: 0,
          max: 100,
        },
        message: 'The maximum image quality is 100%',
      },
    ])
    .disabled(false)
    .omitted(false)
    .defaultValue({ 'en-US': 100 })

  image.changeFieldControl('quality', 'builtin', 'numberEditor', {
    helpText:
      'You can alter the quality of the image, expressed as a percentage value between 1 and 100. Quality value is only ignored for 8-bit PNGs.',
  })

  image
    .createField('format')
    .name('Image Format')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['jpg', 'png', 'webp', 'gif', 'avif'],
      },
    ])
    .disabled(false)
    .omitted(false)

  image.changeFieldControl('format', 'builtin', 'dropdown', {
    helpText:
      'You can convert the image to a different format. The default is the original image format.',
  })

  image
    .createField('fit')
    .name('Image Fit')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['default', 'pad', 'fill', 'scale', 'crop', 'thumb'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .defaultValue({ 'en-US': 'default' })

  image.changeFieldControl('fit', 'builtin', 'dropdown', {
    helpText:
      'By default, images are resized to fit into the specified dimensions. You can request a different behavior using the fit parameter.',
  })

  image
    .createField('focusArea')
    .name('Image Focus Area')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: [
          'center',
          'top',
          'right',
          'left',
          'bottom',
          'top_right',
          'top_left',
          'bottom_right',
          'bottom_left',
          'face',
          'faces',
        ],
      },
    ])
    .disabled(false)
    .omitted(false)
    .defaultValue({ 'en-US': 'center' })

  image.changeFieldControl('focusArea', 'builtin', 'dropdown', {
    helpText:
      'You can choose the focus area for resizing when using fit type pad, fill, crop or thumb. Focus area has no effect on the default or scale fit type.',
  })

  image
    .createField('radius')
    .name('Image Radius')
    .type('Integer')
    .localized(false)
    .required(false)
    .validations([
      {
        range: {
          min: 0,
          max: 100,
        },
        message: 'The maximum image radius is 100',
      },
    ])
    .disabled(false)
    .omitted(false)
    .defaultValue({ 'en-US': 0 })

  image.changeFieldControl('radius', 'builtin', 'numberEditor', {
    helpText:
      'You can add rounded corners to your image or crop to a circle/ellipse. Rounded corners use background color as padding color, unless the format is jpg and resizing behavior is pad, then default to white.',
  })

  image
    .createField('progressive')
    .name('Request a JPEG image as a progressive JPEG?')
    .type('Boolean')
    .localized(false)
    .required(false)
    .validations([])
    .defaultValue({ 'en-US': false })
    .disabled(false)
    .omitted(false)

  image.changeFieldControl('progressive', 'builtin', 'boolean', {
    helpText:
      'The progressive JPEG format stores multiple passes of an image in progressively higher detail. While a progressive image is loading, the viewer first sees a lower quality pixelated version, which gradually improves in detail, until the image is fully downloaded. This displays the image as early as possible in order to maintain the layout as designed.',
  })

  image
    .createField('png8')
    .name('Request a PNG image as a 8-bit PNG?')
    .type('Boolean')
    .localized(false)
    .required(false)
    .validations([])
    .defaultValue({ 'en-US': false })
    .disabled(false)
    .omitted(false)

  image.changeFieldControl('png8', 'builtin', 'boolean', {
    helpText:
      '8-bit PNG images support up to 256 colors and weight less than the standard 24-bit PNG equivalent. The 8-bit PNG format is mostly used for simple images, such as icons or logos.',
  })
};

module.exports.down = (migration) => {
  // Add your DOWN migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const image = migration.editContentType('image')
  image.deleteField('alt')
  image.deleteField('width')
  image.deleteField('height')
  image.deleteField('quality')
  image.deleteField('format')
  image.deleteField('fit')
  image.deleteField('focusArea')
  image.deleteField('radius')
  image.deleteField('progressive')
  image.deleteField('png8')
};
