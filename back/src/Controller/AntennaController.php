<?php

namespace App\Controller;

use App\Repository\AntennaRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class AntennaController extends AbstractController
{
    /**
     * Retourne la liste de toutes les antennes avec leur dernière intervention.
     * @param AntennaRepository $antennaRepository
     * @return JsonResponse La liste des antennes (200)
     */
    #[Route('/api/antennas', name: 'api_antennas', methods: ['GET'])]
    public function antennas(AntennaRepository $antennaRepository): JsonResponse
    {
        $antennas = $antennaRepository->findAll();

        return $this->json($antennas, 200, [], ['groups' => ['antenna:read']]);
    }

    /**
     * Retourne une antenne avec l'historique complet de ses interventions.
     * @param AntennaRepository $antennaRepository
     * @param int $id
     * @return JsonResponse L'antenne avec ses interventions (200) ou un message d'erreur (404)
     */
    #[Route('/api/antennas/{id}', name: 'api_antennas_id', methods: ['GET'])]
    public function antennas_id(AntennaRepository $antennaRepository, int $id): JsonResponse
    {
        $antennas = $antennaRepository->find($id);
        if (empty($antennas)) {
            return $this->json(['error' => 'antenna introuvable'], 404);

        }


        return $this->json($antennas, 200, [], ['groups' => ['antenna:intervention']]);
    }
}
