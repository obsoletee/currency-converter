import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';

const data = {
  paragraph: ['lorem', 'lorem', 'lorem'],
};

const stackList = [
  {
    id: 1,
    name: 'React',
    bio: 'The library for web and native user interfaces',
    image: '/images/reactLogo.png',
    docs: 'https://react.dev/',
  },
  {
    id: 2,
    name: 'Next.js',
    bio: 'The React Framework for the Web',
    image: '/images/nextLogo.jpg',
    docs: 'https://nextjs.org/',
  },
  {
    id: 3,
    name: 'Material UI',
    bio: 'MUI offers a comprehensive suite of free UI tools to help you ship new features faster. Start with Material UI, our fully-loaded component library, or bring your own design system to our production-ready components.',
    image: '/images/muiLogo.png',
    docs: 'https://mui.com/',
  },
  {
    id: 4,
    name: 'Tailwind CSS',
    bio: 'A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.',
    image: '/images/tailwindcssLogo.jpg',
    docs: 'https://tailwindcss.com/',
  },
];

export default function Page() {
  return (
    <>
      <div className="w-full flex justify-center overflow-hidden font-nunito">
        <div className="w-full flex justify-center p-10">
          <div className="flex-col w-full align-center">
            <div className="text-4xl font-bold mb-10">
              Welcome to the Currency Converter!
            </div>
            <div className="mb-20">
              {data.paragraph.map((string) => (
                <div key={string} className="text-2xl mb-5 text-justify">
                  {string}
                </div>
              ))}
            </div>
            <div className="text-4xl font-bold mb-10">Technology Stack</div>
            <div className="flex flex-wrap">
              {stackList.map((stack) => (
                <Card
                  className="transition duration-200 ease-out hover:scale-105 shadow-xl mx-5"
                  key={stack.id}
                  sx={{ width: 345, display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia sx={{ height: 140 }} image={stack.image} />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {stack.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stack.bio}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ mt: 'auto' }}>
                    <Button size="small" href={stack.docs} target="_blank">
                      Documentation
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
