<?php

namespace App\Controller;

use App\Repository\AntennaRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class AntennaController extends AbstractController
{
    #[Route('/api/antennas', name: 'api_antennas', methods: ['GET'])]
    public function index(AntennaRepository $antennaRepository): JsonResponse
    {
        $antennas = $antennaRepository->findAll();

        return $this->json($antennas, 200, [], ['groups' => ['antenna:read']]);
    }
}
