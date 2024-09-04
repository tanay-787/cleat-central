const products = [
    {
      name: "Nike Mercurial Superfly 10 Elite Electric",
      description: "", // no description provided
      price: 24995.00,
      image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/bca62164-b738-41f4-af04-b92bb52caf9d/ZM+SUPERFLY+10+ELITE+FG+OLY.png",
      surfaceType: "FG",
      shoeHeight: "High-Top",
      colour: "1 Colour",
      stock: { isAvailable: true }, // assuming all products are available
      brand: "Nike"
    },
    {
      name: "Nike Phantom Luna 2 Elite Electric",
      description: "", // no description provided
      price: 24895.00,
      image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/641c2ad1-800d-469a-9b5b-55b69ec6be60/PHANTOM+LUNA+II+ELITE+FG.png",
      surfaceType: "FG",
      shoeHeight: "High-Top",
      colour: "1 Colour",
      stock: { isAvailable: true }, // assuming all products are available
      brand: "Nike"
    },
    {
      name: "Nike Phantom GX 2 Elite Electric",
      description: "", // no description provided
      price: 23095.00,
      image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/22e2ecb5-63c9-474a-bc59-81c999a26d87/PHANTOM+GX+II+ELITE+FG.png",
      surfaceType: "FG",
      shoeHeight: "Low-Top",
      colour: "1 Colour",
      stock: { isAvailable: true }, // assuming all products are available
      brand: "Nike"
    },
    {
      name: "Nike Tiempo Legend 10 Elite Electric",
      description: "", // no description provided
      price: 22095.00,
      image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/c291f5b4-2622-4470-897e-0ecf77618bc6/LEGEND+10+ELITE+FG+OLY.png",
      surfaceType: "FG",
      shoeHeight: "Low-Top",
      colour: "1 Colour",
      stock: { isAvailable: true }, // assuming all products are available
      brand: "Nike"
    },
    {
      name: "Nike Phantom GX 2 Academy EasyOn Electric",
      description: "", // no description provided
      price: 9995.00,
      image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/cb278f08-a4ad-43b8-824a-641196ddaf4c/PHANTOM+GX+II+ACAD+EASE+FGMG.png",
      surfaceType: "MG",
      shoeHeight: "Low-Top",
      colour: "1 Colour",
      stock: { isAvailable: true }, // assuming all products are available
      brand: "Nike"
    },
    {
      name: "Nike Mercurial Superfly 10 Elite Blueprint",
      description: "", // no description provided
      price: 23795.00,
      image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/f02453d3-7589-4c91-b86c-6f2262153eac/ZM+SUPERFLY+10+ELITE+F+FG.png",
      surfaceType: "FG",
      shoeHeight: "High-Top",
      colour: "1 Colour",
      stock: { isAvailable: true }, // assuming all products are available
      brand: "Nike"
    },
    {
      name: "Nike Mercurial Superfly 10 Elite 'Kylian Mbappé'",
      description: "", // no description provided
      price: 25095.00,
      image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/737e6beb-15b3-4950-9c82-a642b67c1bfb/ZM+SUPERFLY+10+ELITE+KM+FG.png",
      surfaceType: "FG",
      shoeHeight: "High-Top",
      colour: "1 Colour",
      stock: { isAvailable: true }, // assuming all products are available
      brand: "Nike"
    },
    {
        name: "Nike Mercurial Vapor 16 Academy 'Kylian Mbappé'",
        description: "", // no description provided
        price: 8495.00,
        image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a2bd9036-c80b-4f0d-ae38-9aff809086b8/ZOOM+VAPOR+16+ACADEMY+KM+FG%2FMG.png",
        surfaceType: "MG",
        shoeHeight: "Low-Top",
        colour: "1 Colour",
        stock: { isAvailable: true }, // assuming all products are available
        brand: "Nike"
      },
      {
        name: "Nike Mercurial Superfly 10 Academy 'Kylian Mbappé'",
        description: "", // no description provided
        price: 8995.00,
        image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/bcaf1d52-6ec4-4acb-a7a5-48a685aac77f/ZM+SUPERFLY+10+ACAD+KM+FG%2FMG.png",
        surfaceType: "MG",
        shoeHeight: "High-Top",
        colour: "1 Colour",
        stock: { isAvailable: true }, // assuming all products are available
        brand: "Nike"
      },
      {
        name: "Nike Mercurial Vapor 16 Elite \"Kylian Mbappé\"",
        description: "", // no description provided
        price: 22995.00,
        image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/fc9ac018-7494-4055-8667-b3ec810c3f3f/ZM+VAPOR+16+ELITE+KM+FG.png",
        surfaceType: "FG",
        shoeHeight: "Low-Top",
        colour: "1 Colour",
        stock: { isAvailable: true }, // assuming all products are available
        brand: "Nike"
      },
      {
        name: "Nike Mercurial Superfly 10 Elite",
        description: "", // no description provided
        price: 23795.00,
        image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/f71f58eb-ad7b-4495-acd0-163411f79298/ZM+SUPERFLY+10+ELITE+FG.png",
        surfaceType: "FG",
        shoeHeight: "High-Top",
        colour: "2 colour",
        stock: { isAvailable: true }, // assuming all products are available
        brand: "Nike"
      },
      {
        name: "Nike Mercurial Vapor 16 Elite",
        description: "", // no description provided
        price: 21995.00,
        image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4177cb88-7dbe-47ac-8600-82584ab91f73/ZM+VAPOR+16+ELITE+FG.png",
        surfaceType: "FG",
        shoeHeight: "Low-Top",
        colour: "2 colour",
        stock: { isAvailable: true }, // assuming all products are available
        brand: "Nike"
      },
      {
        name: "Nike Phantom Luna 2 Academy",
        description: "", // no description provided
        price: 8995.00,
        image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/eabbcad7-b3af-44e4-ae91-40da9d7b297e/PHANTOM+LUNA+II+ACADEMY+FG%2FMG.png",
        surfaceType: "MG",
        shoeHeight: "High-Top",
        colour: "2 colour",
        stock: { isAvailable: true }, // assuming all products are available
        brand: "Nike"
      },
      {
        name: "Nike Phantom GX 2 Academy",
        description: "", // no description provided
        price: 7995.00,
        image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/c8d83936-f960-4d5f-be6f-9105c84a1fa0/PHANTOM+GX+II+ACADEMY+FG%2FMG.png",
        surfaceType: "MG",
        shoeHeight: "Low-Top",
        colour: "3 colour",
        stock: { isAvailable: true }, // assuming all products are available
        brand: "Nike"
      },
        {
    name: "Nike Mercurial Vapor 16 Academy 'Kylian Mbappé'",
    description: "", // no description provided
    price: 8495.00,
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a2bd9036-c80b-4f0d-ae38-9aff809086b8/ZOOM+VAPOR+16+ACADEMY+KM+FG%2FMG.png",
    surfaceType: "MG",
    shoeHeight: "Low-Top",
    colour: "1 Colour",
    stock: { isAvailable: true }, // assuming all products are available
    brand: "Nike"
  },
  {
    name: "Nike Mercurial Superfly 10 Academy 'Kylian Mbappé'",
    description: "", // no description provided
    price: 8995.00,
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/bcaf1d52-6ec4-4acb-a7a5-48a685aac77f/ZM+SUPERFLY+10+ACAD+KM+FG%2FMG.png",
    surfaceType: "MG",
    shoeHeight: "High-Top",
    colour: "1 Colour",
    stock: { isAvailable: true }, // assuming all products are available
    brand: "Nike"
  },
  {
    name: "Nike Mercurial Vapor 16 Elite \"Kylian Mbappé\"",
    description: "", // no description provided
    price: 22995.00,
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/fc9ac018-7494-4055-8667-b3ec810c3f3f/ZM+VAPOR+16+ELITE+KM+FG.png",
    surfaceType: "FG",
    shoeHeight: "Low-Top",
    colour: "1 Colour",
    stock: { isAvailable: true }, // assuming all products are available
    brand: "Nike"
  },
  {
    name: "Nike Mercurial Superfly 10 Elite",
    description: "", // no description provided
    price: 23795.00,
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/f71f58eb-ad7b-4495-acd0-163411f79298/ZM+SUPERFLY+10+ELITE+FG.png",
    surfaceType: "FG",
    shoeHeight: "High-Top",
    colour: "2 colour",
    stock: { isAvailable: true }, // assuming all products are available
    brand: "Nike"
  },
  {
    name: "Nike Mercurial Vapor 16 Elite",
    description: "", // no description provided
    price: 21995.00,
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4177cb88-7dbe-47ac-8600-82584ab91f73/ZM+VAPOR+16+ELITE+FG.png",
    surfaceType: "FG",
    shoeHeight: "Low-Top",
    colour: "2 colour",
    stock: { isAvailable: true }, // assuming all products are available
    brand: "Nike"
  },
  {
    name: "Nike Phantom Luna 2 Academy",
    description: "", // no description provided
    price: 8995.00,
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/eabbcad7-b3af-44e4-ae91-40da9d7b297e/PHANTOM+LUNA+II+ACADEMY+FG%2FMG.png",
    surfaceType: "MG",
    shoeHeight: "High-Top",
    colour: "2 colour",
    stock: { isAvailable: true }, // assuming all products are available
    brand: "Nike"
  },
  {
    name: "Nike Phantom GX 2 Academy",
    description: "", // no description provided
    price: 7995.00,
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/c8d83936-f960-4d5f-be6f-9105c84a1fa0/PHANTOM+GX+II+ACADEMY+FG%2FMG.png",
    surfaceType: "MG",
    shoeHeight: "Low-Top",
    colour: "3 colour",
    stock: { isAvailable: true }, // assuming all products are available
    brand: "Nike"
  },
  {
    name: "Nike Mercurial Vapor 16 Academy",
    description: "", // no description provided
    price: 7995.00,
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/2f196101-347d-4bf5-a86a-a816577eda22/ZOOM+VAPOR+16+ACADEMY+FG%2FMG.png",
    surfaceType: "MG",
    shoeHeight: "Low-Top",
    colour: "2 colour",
    stock: { isAvailable: true }, // assuming all products are available
    brand: "Nike"
  },
  {
    name: "Nike Tiempo Legend 10 Academy",
    description: "", // no description provided
    price: 7495.00,
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/d1afb0f2-6b34-43cf-92d0-f134dcafc3f7/LEGEND+10+ACADEMY+FG%2FMG.png",
    surfaceType: "MG",
    shoeHeight: "Low-Top",
    colour: "2 colour",
    stock: { isAvailable: true }, // assuming all products are available
    brand: "Nike"
  },
  {
    name: "Nike Mercurial Superfly 10 Club",
    description: "", // no description provided
    price: 5995.00,
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/82182873-0ecc-4b73-898b-62c1d745e95e/SUPERFLY+10+CLUB+FG%2FMG.png",
    surfaceType: "MG",
    shoeHeight: "High-Top",
    colour: "1 Colour",
    stock: { isAvailable: true }, // assuming all products are available
    brand: "Nike"
  },
  {
    name: "Nike Mercurial Vapor 16 Club",
    description: "", // no description provided
    price: 4995.00,
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/05442d82-fde1-401f-a24e-33409f65c375/VAPOR+16+CLUB+FG%2FMG.png",
    surfaceType: "MG",
    shoeHeight: "Low-Top",
    colour: "1 Colour",
    stock: { isAvailable: true }, // assuming all products are available
    brand: "Nike"
  },
  {
    name: "Nike Phantom GX 2 Club",
    description: "", // no description provided
    price: 5495.00,
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a3ab8d17-8664-453b-8cfa-afa178155587/PHANTOM+GX+II+CLUB+FG%2FMG.png",
    surfaceType: "MG",
    shoeHeight: "Low-Top",
    colour: "2 colour",
    stock: { isAvailable: true }, // assuming all products are available
    brand: "Nike"
  },
  {
    name: "Nike Mercurial Superfly 10 Academy",
    description: "", // no description provided
    price: 8995.00,
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/615bd8bf-ea41-487a-b3e1-70399eef6be6/ZM+SUPERFLY+10+ACAD+FG%2FMG.png",
    surfaceType: "MG",
    shoeHeight: "High-Top",
    colour: "1 Colour",
    stock: { isAvailable: true }, // assuming all products are available
    brand: "Nike"
  },
  {
    name: "Nike Phantom GX 2 Elite",
    description: "", // no description provided
    price: 22995.00,
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/07d587e9-2575-44bb-b509-6ead2fcd3888/PHANTOM+GX+II+ELITE+AS+FG.png",
    surfaceType: "FG",
    shoeHeight: "Low-Top",
    colour: "1 Colour",
    stock: { isAvailable: true }, // assuming all products are available
    brand: "Nike"
  },
  {
    name: "Nike Tiempo Legend 10 Club",
    description: "", // no description provided
    price: 4995.00,
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/9f7a5f6c-5a3c-4a3f-8f6c-5a3c4a3f8f6c/LEGEND+10+CLUB+FG%2FMG.png",
    surfaceType: "MG",
    shoeHeight: "Low-Top",
    colour: "1 Colour",
    stock: { isAvailable: true }, // assuming all products are available
    brand: "Nike"
  },
  {
    name: "Nike Mercurial Vapor 16 Pro",
    description: "", // no description provided
    price: 19995.00,
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/1f7a5f6c-5a3c-4a3f-8f6c-5a3c4a3f8f6c/VAPOR+16+PRO+FG.png",
    surfaceType: "FG",
    shoeHeight: "Low-Top",
    colour: "2 colour",
    stock: { isAvailable: true }, // assuming all products are available
    brand: "Nike"
  },
  {
    name: "Nike Mercurial Superfly 10 Pro",
    description: "", // no description provided
    price: 20995.00,
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/2f7a5f6c-5a3c-4a3f-8f6c-5a3c4a3f8f6c/SUPERFLY+10+PRO+FG.png",
    surfaceType: "FG",
    shoeHeight: "High-Top",
    colour: "2 colour",
    stock: { isAvailable: true }, // assuming all products are available
    brand: "Nike"
  }
]