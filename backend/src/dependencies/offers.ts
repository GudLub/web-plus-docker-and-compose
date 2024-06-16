import { WishModule } from 'src/wish/wish.module'; 
import { UserModule } from 'src/user/user.module';

export const offerDependencies = [WishModule, UserModule];