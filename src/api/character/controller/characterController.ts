import { FastifyPluginCallback, FastifyRequest } from 'fastify';
import { CharacterQueryRequest } from '../types';
import CharacterService from '../CharacterService';
const characterService = new CharacterService();

export const characterController: FastifyPluginCallback = (app, opts, done) => {
  app.get('/authenticated/characters', async (req: any, res) => {
    console.log('USER', req?.user);
    if (!req?.user?.token) {
      res.status(500).send({ message: 'Failed while fetching Characters' });
      done();
    }
    try {
      console.log('___ ', req?.user?.token);
      const characters = await characterService.getUsersCharactersList(req?.user?.token);
      return await res.status(200).send(characters);
    } catch (e) {
      res.status(500).send({ message: 'Failed while fetching Characters' });
      done();
    }
  });

  /// authenticated/character/professions?name=Cdb&slug=Thrall&region=eu
  app.get('/authenticated/character/professions', async (req: any, res) => {
    if (!req?.user?.token) {
      res.status(500).send({ message: 'Failed while fetching Characters' });
      done();
    }
    try {
      console.log('is in professions');
      const { name, slug } = req.query;
      const professions = await characterService.getUserProfessionsToCharacter(
        req?.user?.token,
        name,
        slug
      );
      await res.status(200).send(professions);
      done();
    } catch (e) {
      res.status(500).send({ message: 'Failed while fetching Characters' });
      done();
    }
  });
  done();
};
