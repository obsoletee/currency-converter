import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';

import { stackList } from '@/model/StackList';

const data = {
  paragraph: [
    'This is a converter that allows you to find out the exchange rates of any of the 161 currently available currencies. The converter is available on the "Converter" tab, and the table with all currencies on the "Currency List" tab.',
    'The main stack of technologies used in the development is given below. Currency exchange rate data comes from the server and is stored in the database.',
  ],
};

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
            <div className="flex flex-wrap gap-10">
              {stackList.map((stack) => (
                <Card
                  className="transition duration-200 ease-out hover:scale-105 shadow-xl"
                  key={stack.id}
                  sx={{ width: 320, display: 'flex', flexDirection: 'column' }}
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
